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
            brand,
            price,
            oldPrice,
            stock,
            lowStockLevel,
            image,
            images,
            badge,
            rating,
            specifications,
            reviews,
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
            data: {
                name,
                slug,
                description,
                sku,
                brand,
                price: Number(price),
                oldPrice: oldPrice ? Number(oldPrice) : null,
                stock: productStock,
                lowStockLevel: Number(lowStockLevel ?? 5),
                image,
                images,
                badge,
                rating: Number(rating ?? 0),
                specifications: specifications ?? {},
                reviews: reviews ?? [],
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

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const {
            name,
            slug,
            description,
            sku,
            brand,
            price,
            oldPrice,
            stock,
            lowStockLevel,
            image,
            images,
            badge,
            rating,
            specifications,
            reviews,
            categoryId
        } = req.body

        if (price !== undefined && (
            !Number.isFinite(Number(price)) || Number(price) < 0
        )) {
            return res.status(400).json({
                success: false,
                message: "Price must a valid non-negative number"
            })
        }

        if (stock !== undefined && (
            !Number.isInteger(Number(stock)) || Number(stock) < 0
        )) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative integer"
            })
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(slug != undefined && { slug }),
                ...(description !== undefined && { description }),
                ...(sku !== undefined && { sku }),
                ...(brand !== undefined && { brand }),
                ...(price !== undefined && { price: Number(price) }),
                ...(oldPrice !== undefined && {
                    oldPrice: oldPrice === "" || oldPrice === null
                        ? null
                        : Number(oldPrice)
                }),
                ...(stock !== undefined && {stock: Number(stock) }),
                ...(lowStockLevel !== undefined && {
                    lowStockLevel: Number(lowStockLevel)
                }),
                ...(image !== undefined && { image }),
                ...(images !== undefined && { images }),
                ...(badge !== undefined && { badge }),
                ...(rating !== undefined && { rating: Number(rating) }),
                ...(specifications !== undefined && {
                    specifications
                }),
                ...(reviews !== undefined && {
                    reviews
                }),
                ...(categoryId !== undefined && { categoryId })
            },
            include: {
                category: true
            }
        })

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error("Error updating product:", error)

        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

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
            message: "Failed to update product"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deletedProduct = await prisma.product.update({
            where: { id },
            data: {
                isActive: false
            }
        })

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        })
    } catch (error) {
        console.error("Error deleting product:", error)

        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete product"
        })
    }
}