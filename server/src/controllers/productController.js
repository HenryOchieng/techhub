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