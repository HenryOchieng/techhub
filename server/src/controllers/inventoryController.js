import prisma from "../config/db.js"

export const restockProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { quantity, supplier, reference, notes } = req.body

        const restockQuantity = Number(quantity)

        if (
            quantity === undefined ||
            !Number.isInteger(restockQuantity) ||
            restockQuantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer"
            })
        }

        const optionalFields = { supplier, reference, notes }

        for (const [field, value] of Object.entries(optionalFields)) {
            if (value !== undefined && value !== null && typeof value !== "string") {
                return res.status(400).json({
                    success: false,
                    message: `${field} must be a string`
                })
            }
        }

        let result 

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                result = await prisma.$transaction(
                    async (tx) => {
                        const product = await tx.product.findFirst({
                            where: {
                                id,
                                isActive: true
                            }
                        })

                        if (!product) {
                            const error = new Error("Product not found")
                            error.statusCode = 404
                            throw error
                        }

                        const stockBefore = product.stock
                        const stockAfter = stockBefore + restockQuantity

                        const updatedProduct = await tx.product.update({
                            where: { id },
                            data: {
                                stock: {
                                    increment: restockQuantity
                                }
                            },
                            include: {
                                category: true
                            }
                        })

                        const movement = await tx.inventoryMovement.create({
                            data: {
                                productId: id,
                                type: "RESTOCK",
                                quantity: restockQuantity,
                                stockBefore,
                                stockAfter,
                                supplier: supplier?.trim() || null,
                                reference: reference?.trim() || null,
                                notes: notes?.trim() || null
                            }
                        })

                        return {
                            product: updatedProduct,
                            movement
                        }
                    },
                    {
                        isolationLevel: "Serializable"
                    }
                )

                break
            } catch (error) {
                if (error.code === "P2034" && attempt < 3) {
                    continue
                }

                throw error
            }
        }

        res.status(200).json({
            success: true,
            message: "Product restocked successfully",
            product: result.product,
            movement: result.movement
        })
    } catch (error) {
        console.error("Error restocking product:", error)

        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        res.status(500).json({
            success: false,
            message: "Failed to restock product"
        })
    }
}

export const adjustStock = async (req, res) => {
    try {
        const { id } = req.params
        const { quantity, adjustment, notes, reference } = req.body

        const adjustmentQuantity = Number(quantity)

        if (
            quantity === undefined ||
            !Number.isInteger(adjustmentQuantity) ||
            adjustmentQuantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer"
            })
        }

        if (!["INCREASE", "DECREASE"].includes(adjustment)) {
            return res.status(400).json({
                success: false,
                message: "Adjustment must be INCREASE or DECREASE"
            })
        }

        if (
            (notes !== undefined && notes !== null && typeof notes !== "string") ||
            (reference !== undefined && reference !== null && typeof reference !== "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Notes and reference must be strings"
            })
        }

        let result

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                result = await prisma.$transaction(
                    async (tx) => {
                        const product = await tx.product.findFirst({
                            where: {
                                id, isActive: true
                            }
                        })

                        if (!product) {
                            const error = new Error("Product not found")
                            error.statusCode = 404
                            throw error
                        }

                        const stockBefore = product.stock

                        const stockAfter = adjustment === "INCREASE"
                            ? stockBefore + adjustmentQuantity
                            : stockBefore - adjustmentQuantity

                        if (stockAfter < 0) {
                            const error = new Error(`Insufficient stock. Available stock: ${stockBefore}`)
                            error.statusCode = 400
                            throw error
                        }

                        const updatedProduct = await tx.product.update({
                            where: { id },
                            data: {
                                stock: adjustment === "INCREASE"
                                    ? { increment: adjustmentQuantity }
                                    : { decrement: adjustmentQuantity }
                            },
                            include: {
                                category: true
                            }
                        })

                        const movement = await tx.inventoryMovement.create({
                            data: {
                                productId: id,
                                type: "ADJUSTMENT",
                                quantity: adjustment === "DECREASE"
                                    ? -adjustmentQuantity
                                    : adjustmentQuantity,
                                stockBefore,
                                stockAfter,
                                reference: reference?.trim() || null,
                                notes: notes?.trim() || null
                            }
                        })

                        return {
                            product: updatedProduct,
                            movement
                        }
                    },
                    {
                        isolationLevel: "Serializable"
                    }
                )

                break
            } catch (error) {
                if (error.code === "P2034" && attempt < 3) {
                    continue
                }

                throw error
            }
        }

        res.status(200).json({
            success: true,
            message: "Stock adjusted successfully",
            product: result.product,
            movement: result.movement
        })
    } catch (error) {
        console.error("Error adjusting stock:", error)

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }
    }
}

export const getInventoryHistory = async (req, res) => {
    try {
        const {
            productId,
            type,
            page = "1",
            limit = "20"
        } = req.query

        const pageNumber = Number(page)
        const pageSize = Number(limit)

        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            !Number.isInteger(pageSize) ||
            pageSize < 1 ||
            pageSize > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid pagination. Page must be positive and limit must be between 1 and 100."
            })
        }

        const validTypes = [
            "RESTOCK",
            "SALE",
            "RETURN",
            "ADJUSTMENT"
        ]

        if (type && !validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inventory movement type",
                validTypes
            })
        }

        const skip = (pageNumber -1) * pageSize

        const where = {
            ...(productId && { productId }),
            ...(type && { type })
        }

        const [movements, totalMovements] = await Promise.all([
            prisma.inventoryMovement.findMany({
                where,
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            sku: true,
                            image: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: pageSize
            }),

            prisma.inventoryMovement.count({
                where
            })
        ])

        res.status(200).json({
            success: true,
            movements,
            pagination: {
                currentPage: pageNumber,
                pageSize,
                totalMovements,
                totalPages: Math.ceil(totalMovements / pageSize),
                hasNextPage: pageNumber * pageSize < totalMovements,
                hasPreviousPage: pageNumber > 1
            }
        })
    } catch (error) {
        console.error("Error fetching inventory history:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch inventory history"
        })
    }
}

export const getLowStockProducts = async (req, res) => {
    try {
        const page = Number(req.query.page ?? 1)
        const limit = Number(req.query.limit ?? 20)

        if (
            !Number.isInteger(page) ||
            page < 1 ||
            !Number.isInteger(limit) ||
            limit < 1 ||
            limit > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Page must be positive and limit must be between 1 and 100"
            })
        }

        const where = {
            isActive: true,
            stock: {
                gt: 0,
                lte: prisma.product.fields.lowStockLevel
            }
        }

        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: true
                },
                orderBy: {
                    stock: "asc"
                },
                skip: (page - 1) * limit,
                take: limit
            }),

            prisma.product.count({ where })
        ])

        res.status(200).json({
            success: true,
            products,
            pagination: {
                currentPage: page,
                pageSize: limit,
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                hasNextPage: page * limit < totalProducts,
                hasPreviousPage: page > 1
            }
        })
    } catch (error) {
        console.error("Error fetching low-stock products:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch low-stock products"
        })
    }
}

export const getOutOfStockProducts = async (req, res) => {
    try {
        const {
            page = "1",
            limit = "20"
        } = req.query

        const pageNumber = Number(page)
        const pageSize = Number(limit)

        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            !Number.isInteger(pageSize) ||
            pageSize < 1 ||
            pageSize > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid pagination. Page must be positive and limit must be between 1 and 100."
            })
        }

        const where = {
            isActive: true,
            stock: 0
        }

        const skip = (pageNumber - 1) * pageSize

        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: true
                },
                orderBy: {
                    updatedAt: "desc"
                },
                skip,
                take: pageSize
            }),

            prisma.product.count({ where })
        ])

        res.status(200).json({
            success: true,
            count: products.length,
            products,
            pagination: {
                currentPage: pageNumber,
                pageSize,
                totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                hasNextPage: pageNumber * pageSize < totalProducts,
                hasPreviousPage: pageNumber > 1
            }
        })
    } catch (error) {
        console.error("Error fetching out-of-stock products:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch out-of-stock products"
        })
    }
}