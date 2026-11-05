import "dotenv/config"
import process from "node:process"
import express from "express"
import cors from "cors"
import prisma from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to TechHub Kenya API"
    })
})

// Database health check
app.get("/api/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`

        res.status(200).json({
            success: true,
            message: "TechHub Kenya API is running",
            database: "Connected"
        })
    } catch (error) {
        console.error("Database connection failed:", error)

        res.status(500).json({
            success: false,
            message: "API is running, but database connection failed"
        })
    }
})

app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`TechHub Kenya API running on port ${PORT}`)
})
