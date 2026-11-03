import prisma from "../config/db.js"

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true
            },
            include: {
                category: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch (error) {
        console.error("Error fetching products:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            sku,
            price,
            oldPrice,
            stock,
            lowStockLevel,
            image,
            images,
            badge,
            rating,
            categoryId
        } = req.body

        if (
            !name ||
            !slug ||
            !sku ||
            price === undefined ||
            !categoryId
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        if (!Number.isFinite(Number(price)) || Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid non-negative number"
            })
        }

        const productStock = Number(stock ?? 0)

        if (!Number.isInteger(productStock) || productStock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative integer"
            })
        }

        const newProduct = await prisma.product.create({
            date: {
                name,
                slug,
                description,
                sku,
                price: Number(price),
                oldPrice: oldPrice ? Number(oldPrice) : null,
                stock: productStock,
                lowStockLevel: Number(lowStockLevel ?? 5),
                image,
                images,
                badge,
                rating: Number(rating ?? 0),
                categoryId
            },
            include: {
                category: true
            }
        })

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        })
    } catch (error) {
        console.error("Error creating product:", error)

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "A product with this SKU or slug already exists"
            })
        }

        if (error.code === "P2003") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            })
        }

        res.status(500).json({
            success: false,
            message: "Failed to create product"
        })
    }
}