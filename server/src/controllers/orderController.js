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
                            userId: req.user.id,
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

export const getOrders = async (req, res) => {
    try {
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
        const limit = Math.min(
            100, Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
        )

        const { status } = req.query

        const validStatutes = [
            "PENDING",
            "CONFIRMED",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ]

        if (status && !validStatutes.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            })
        }

        const where = {
            ...(status ? { status } : {}),
            ...(req.user.role !== "ADMIN"
                ? { userId: req.user.id }
                : {}
            )
        }

        const [orders, totalOrders] = await prisma.$transaction([
            prisma.order.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    sku: true,
                                    image: true
                                }
                            }
                        }
                    },
                    payment: true
                }
            }),
            prisma.order.count({ where })
        ])

        return res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                totalOrders,
                currentPage: page,
                totalPages: Math.ceil(totalOrders / limit),
                pageSize: limit
            }
        })
    } catch (error) {
        console.error("Get orders error:", error)

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve orders"
        })
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params

        const order = await prisma.order.findUnique({
            where: {
                id,
                ...(req.user.role !== "ADMIN"
                    ? { userId: req.user.id }
                    : {}
                )
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                sku: true,
                                image: true
                            }
                        }
                    }
                },
                payment: true
            }
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.error("Get order error:", error)

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve order"
        })
    }
}

const allowedOrderTranisiions = {
    PENDING: ["CONFIRMED"],
    CONFIRMED: ["PROCESSING"],
    PROCESSING: ["SHIPPED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: []
}

const runSerializableTransaction = async (callback) => {
    for (let attempt = 1; attempt <= 3; attempt ++) {
        try {
            return await prisma.$transaction(callback, {
                isolationLevel: "Serializable"
            })
        } catch (error) {
            if (error.code === "P2034" && attempt < 3) {
                continue
            }

            throw error
        }
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!Object.prototype.hasOwnProperty.call(
            allowedOrderTranisiions,
            status
        )) {
            return res.status(400).json({
                success: false,
                message: "Invaid order status"
            })
        }

        if (status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: "Use the cancellation endpoint to cancel an order"
            })
        }

        const updatedOrder = await runSerializableTransaction(
            async (tx) => {
                const order = await tx.order.findUnique({
                    where: { id }
                })

                if (!order) {
                    const error = new Error("Order not found")
                    error.statusCode = 404
                    throw error
                }

                if (order.status === status) {
                    return order
                }

                const allowed = allowedOrderTranisiions[order.status]

                if (!allowed.includes(status)) {
                    const error = new Error(`Cannot change order status from ${order.status} to ${status}`)
                    error.statusCode = 409
                    throw error
                }

                return tx.order.update({
                    where: { id },
                    data: { status }
                })
            }
        )

        return res.status(200).json({
            success: true,
            message: "Order status update successfully",
            data: updatedOrder
        })
    } catch (error) {
        console.error("Update order status error:", error)

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode ? error.message : "Unable to update order status"
        })
    }
}

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params

        const result = await runSerializableTransaction(
            async (tx) => {
                const order = await tx.order.findFirst({
                    where: {
                        id,
                        ...(req.user.role !== "ADMIN"
                            ? { userId: req.user.id }
                            : {}
                        )
                    },
                    include: {
                        items: true
                    }
                })

                if (!order) {
                    const error = new Error("Order not found")
                    error.statusCode = 404
                    throw error
                }

                if (order.status === "CANCELLED") {
                    return {
                        order,
                        alreadyCancelled: true,
                        stockRestored: order.stockRestored
                    }
                }

                if (["SHIPPED", "DELIVERED"].includes(order.status)) {
                    const error = new Error(
                        "Shipped or delivered orders cannot be cancelled"
                    )
                    error.statusCode = 409
                    throw error
                }

                if (
                    order.stockDeducted &&
                    !order.stockRestored
                ) {
                    for (const item of order.items) {
                        const product = await tx.product.findUnique({
                            where: {
                                id: item.productId
                            }
                        })

                        if (!product) {
                            throw new Error(
                                `Product not found: ${item.productName}`
                            )
                        }

                        const stockBefore = product.stock
                        const stockAfter = stockBefore + item.quantity

                        await tx.product.update({
                            where: {
                                id: item.productId
                            },
                            data: {
                                stock: {
                                    increment: item.quantity
                                }
                            }
                        })

                        await tx.inventoryMovement.create({
                            data: {
                                product: {
                                    connect: {
                                        id: item.productId
                                    }
                                },
                                type: "RETURN",
                                quantity: item.quantity,
                                stockBefore,
                                stockAfter,
                                reference: order.orderNumber,
                                notes: `Stock restored after cancellation of order ${order.orderNumber}`
                            }
                        })
                    }
                }

                const cancelledOrder = await tx.order.update({
                    where: { id },
                    data: {
                        status: "CANCELLED",
                        ...(order.stockDeducted && !order.stockRestored
                            ? { stockRestored: true }
                            : {})
                    },
                    include: {
                        items: true,
                        payment: true
                    }
                })

                return {
                    order: cancelledOrder,
                    alreadyCancelled: false,
                    stockRestored: cancelledOrder.stockRestored
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: result.alreadyCancelled
                ? "Order was already cancelled"
                : "Order cancelled successfully",
            data: result
        })
    } catch (error) {
        console.error("Cancel order error:", error)

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Unable to cancel order"
        })
    }
}