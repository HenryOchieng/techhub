import prisma from "../config/db.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        })

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        })
    } catch (error) {
        console.error("Error fetching categories:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image } = req.body

        if (!name || !slug) {
            return res.status(400).json({
                success: false,
                message: "Category name and slug are required"
            })
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description,
                image,
            }
        })

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        })
    } catch (error) {
        console.error("Error creating category:", error)

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "A ctegory with this name or slug already exists"
            })
        }

        res.status(500).json({
            success: false,
            message: "Falied to create category"
        })
    }
}