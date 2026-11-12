
import prisma from "../config/db.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        })

        return res.status(200).json({
            success: true,
            count: categories.length,
            categories
        })
    } catch (error) {
        console.error("Error fetching categories:", error)

        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            image
        } = req.body ?? {}

        // Validate required fields
        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Category name and slug are required"
            })
        }

        // Validate optional fields
        if (
            (description !== undefined &&
                description !== null &&
                typeof description !== "string") ||
            (image !== undefined &&
                image !== null &&
                typeof image !== "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Description and image must be strings"
            })
        }

        const category = await prisma.category.create({
            data: {
                name: name.trim(),
                slug: slug.trim(),
                description: description?.trim() || null,
                image: image?.trim() || null
            }
        })

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        })
    } catch (error) {
        console.error("Error creating category:", error)

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "A category with this name or slug already exists"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create category"
        })
    }
}
