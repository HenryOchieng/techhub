import prisma from "../config/db.js"

const isValidNonNegativeNumber = (value) => {
    return (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        Number.isFinite(Number(value)) &&
        Number(value) >= 0
    )
}

const isValidNonNegativeInteger = (value) => {
    return (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 0
    )
}

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
            typeof name !== "string" || !name.trim() ||
            typeof slug !== "string" || !slug.trim() ||
            typeof sku !== "string" || !sku.trim() ||
            typeof categoryId !== "string" || !categoryId.trim() ||
            price === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, slug, SKU, price and category are required"
            })
        }

        if (!isValidNonNegativeNumber(price)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid non-negative number"
            })
        }

        if (
            oldPrice !== undefined &&
            oldPrice !== null &&
            oldPrice !== "" &&
            !isValidNonNegativeNumber(oldPrice)
        ) {
            return res.status(400).json({
                success: false,
                message: "Old price must be a valid non-negative number"
            })
        }

        const productStock = 0

        const productLowStockLevel = lowStockLevel ?? 5

        if (!isValidNonNegativeInteger(productLowStockLevel)) {
            return res.status(400).json({
                success: false,
                message: "Low stock level must be a non-negative integer"
            })
        }

        const productRating = rating ?? 0

        if (
            !isValidNonNegativeNumber(productRating) ||
            Number(productRating) > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 0 and 5"
            })
        }


        const newProduct = await prisma.product.create({
            data: {
                name: name.trim(),
                slug: slug.trim(),
                description,
                sku,
                brand,
                price: Number(price),
                oldPrice: oldPrice === "" || oldPrice === undefined
                    ? null
                    : oldPrice === null
                        ? null
                        : Number(oldPrice),
                stock: Number(productStock),
                lowStockLevel: Number(productLowStockLevel),
                image,
                images,
                badge,
                rating: Number(productRating),
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


        if (
            name !== undefined &&
            (typeof name !== "string" || !name.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Product name cannot be empty"
            })
        }

        if (
            slug !== undefined &&
            (typeof slug !== "string" || !slug.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Product slug cannot be empty"
            })
        }

        if (
            sku !== undefined &&
            (typeof sku !== "string" || !sku.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Product SKU cannot be empty"
            })
        }

        if (
            price !== undefined &&
            !isValidNonNegativeNumber(price)
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid non-negative number"
            })
        }

        if (
            oldPrice !== undefined &&
            oldPrice !== null &&
            oldPrice !== "" &&
            !isValidNonNegativeNumber(oldPrice)
        ) {
            return res.status(400).json({
                success: false,
                message: "Old price must be a valid non-negative number"
            })
        }

        if (
            lowStockLevel !== undefined &&
            !isValidNonNegativeInteger(lowStockLevel)
        ) {
            return res.status(400).json({
                success: false,
                message: "Low stock level must be a non-negative integer"
            })
        }

        if (
            rating !== undefined &&
            (
                !isValidNonNegativeNumber(rating) ||
                Number(rating) > 5
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 0 and 5"
            })
        }

        if (stock !== undefined) {
            return res.status(400).json({
                success: false,
                message: "Use the inventory endpoints to update product stock"
            })
        }

        if (
            categoryId !== undefined &&
            (typeof categoryId !== "string" || !categoryId.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            })
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No update fields provided"
            })
        }


        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(slug != undefined && { slug: slug.trim() }),
                ...(description !== undefined && { description }),
                ...(sku !== undefined && { sku: sku.trim() }),
                ...(brand !== undefined && { brand }),
                ...(price !== undefined && { price: Number(price) }),
                ...(oldPrice !== undefined && {
                    oldPrice: oldPrice === "" || oldPrice === null
                        ? null
                        : Number(oldPrice)
                }),
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