import prisma from "../config/db.js"
import { randomUUID } from "node:crypto"

const paymentMethods = {
    "M-Pesa": "MPESA",
    "MPESA": "MPESA",
    "Credit/Debit Card": "CARD",
    "CARD": "CARD",
    "Cash On Delivery": "CASH_ON_DELIVERY",
    "CASH_ON_DELIVERY": "CASH_ON_DELIVERY"
}

export const createOrder = async (req, res) => {
    const {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        county,
        postalCode,
        notes,
        paymentMethod,
        phoneNumber,
        items
    } = req.body

    // 1. Validate customer information
    if (
        !customerName?.trim() ||
        !customerEmail?.trim() ||
        !customerPhone?.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Customer name, email and phone are required"
        })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address"
        })
    }

    // 2. Validate payment method
    const method = paymentMethods[paymentMethod]

    if (!method) {
        return res.status(400).json({
            success: false,
            message: "Invalid payment method"
        })
    }

    if (method === "MPESA" && !phoneNumber?.trim()) {
        return res.status(400).json({
            success: false,
            message: "M-Pesa phone number is required"
        })
    }

    // 3. Validate order items
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Your order must contain at least one product"
        })
    }

    // Consolidate duplicate product IDs
    const quantities = new Map()

    for (const item of items) {
        const productId = item.productId
        const quantity = Number(item.quantity)

        if (
            typeof productId !== "string" ||
            !productId.trim() ||
            !Number.isSafeInteger(quantity) ||
            quantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Each item must have a valid productId and positive integer quantity"
            })
        }

        const newQuantity =
            (quantities.get(productId) || 0) + quantity

        if (!Number.isSafeInteger(newQuantity)) {
            return res.status(400).json({
                success: false,
                message: "Invalid total product quantity"
            })
        }

        quantities.set(productId, newQuantity)
    }

    const orderItems = Array.from(
        quantities,
        ([productId, quantity]) => ({
            productId,
            quantity
        })
    )

    // 4. Calculate prices and reserve stock transactionally
    let attempts = 0
    const maxAttempts = 3

    while (attempts < maxAttempts) {
        try {
            const order = await prisma.$transaction(
                async (tx) => {
                    const productIds = orderItems.map(
                        item => item.productId
                    )

                    // Retrieve authoritative product information
                    const products = await tx.product.findMany({
                        where: {
                            id: { in: productIds },
                            isActive: true
                        }
                    })

                    if (products.length !== productIds.length) {
                        const error = new Error(
                            "One or more products do not exist or are unavailable"
                        )
                        error.statusCode = 400
                        throw error
                    }

                    const productMap = new Map(
                        products.map(product => [
                            product.id,
                            product
                        ])
                    )

                    let subtotalCents = 0

                    const preparedItems = orderItems.map(item => {
                        const product = productMap.get(item.productId)

                        if (product.stock < item.quantity) {
                            const error = new Error(
                                `Insufficient stock for ${product.name}. Available: ${product.stock}`
                            )
                            error.statusCode = 409
                            throw error
                        }

                        const priceCents = Math.round(
                            Number(product.price) * 100
                        )

                        const itemSubtotalCents =
                            priceCents * item.quantity

                        subtotalCents += itemSubtotalCents

                        return {
                            ...item,
                            product,
                            priceCents,
                            itemSubtotalCents
                        }
                    })

                    const shippingCents =
                        subtotalCents >= 500000 ? 0 : 50000

                    const totalCents =
                        subtotalCents + shippingCents

                    // Generate a unique order number
                    const orderNumber =
                        `THK-${Date.now()}-${randomUUID()
                            .slice(0, 8)
                            .toUpperCase()}`

                    // Deduct stock and record SALE movements
                    for (const item of preparedItems) {
                        const stockBefore = item.product.stock
                        const stockAfter =
                            stockBefore - item.quantity

                        const stockUpdate =
                            await tx.product.updateMany({
                                where: {
                                    id: item.productId,
                                    isActive: true,
                                    stock: {
                                        gte: item.quantity
                                    }
                                },
                                data: {
                                    stock: {
                                        decrement: item.quantity
                                    }
                                }
                            })

                        if (stockUpdate.count !== 1) {
                            const error = new Error(
                                `Insufficient stock for ${item.product.name}`
                            )
                            error.statusCode = 409
                            throw error
                        }

                        await tx.inventoryMovement.create({
                            data: {
                                productId: item.productId,
                                type: "SALE",
                                quantity: -item.quantity,
                                stockBefore,
                                stockAfter,
                                reference: orderNumber,
                                notes: `Stock deducted for order ${orderNumber}`
                            }
                        })
                    }

                    // Create order, order items and payment together
                    return await tx.order.create({
                        data: {
                            orderNumber,
                            customerName: customerName.trim(),
                            customerEmail: customerEmail.trim(),
                            customerPhone: customerPhone.trim(),
                            shippingAddress:
                                shippingAddress?.trim() || null,
                            city: city?.trim() || null,
                            county: county?.trim() || null,
                            postalCode: postalCode?.trim() || null,
                            notes: notes?.trim() || null,

                            subtotal: (subtotalCents / 100).toFixed(2),
                            shippingFee: (shippingCents / 100).toFixed(2),
                            total: (totalCents / 100).toFixed(2),

                            status: "PENDING",
                            stockDeducted: true,
                            stockRestored: false,

                            items: {
                                create: preparedItems.map(item => ({
                                    productId: item.productId,
                                    productName: item.product.name,
                                    productSku: item.product.sku,
                                    quantity: item.quantity,
                                    price: (
                                        item.priceCents / 100
                                    ).toFixed(2),
                                    subtotal: (
                                        item.itemSubtotalCents / 100
                                    ).toFixed(2)
                                }))
                            },

                            payment: {
                                create: {
                                    method,
                                    status: "PENDING",
                                    amount: (
                                        totalCents / 100
                                    ).toFixed(2),
                                    phoneNumber:
                                        method === "MPESA"
                                            ? phoneNumber.trim()
                                            : null
                                }
                            }
                        },
                        include: {
                            items: true,
                            payment: true
                        }
                    })
                },
                {
                    isolationLevel: "Serializable"
                }
            )

            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: order
            })

        } catch (error) {
            // Retry serialization conflicts
            if (error.code === "P2034" && attempts < maxAttempts - 1) {
                attempts++
                continue
            }

            console.error("Create order error:", error)

            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.statusCode
                    ? error.message
                    : "Unable to create order"
            })
        }
    }
}