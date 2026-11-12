import "dotenv/config"
import process from "node:process"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import prisma from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { apiLimiter, authLimiter } from "./middleware/rateLimitMiddleware.js"

const app = express()

//Security middleware
app.use(helmet())

//General Middleware
app.use(cors())

//Rate limiting
app.use("/api", apiLimiter)
app.use("/api/auth", authLimiter)

//Request body parsing
app.use(express.json({
    limit: "10kb"
}))

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
app.use("/api/payments", paymentRoutes)
app.use("/api/auth", authRoutes)

//Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not foumd`
    })
})

//Centralized error handling middleware
app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err)
    }

    console.error("API ERROR:", err)

    //JSON body exceeds the configured limit
    if (err.type === "entity.too.large") {
        return res.status(413).json({
            success: false,
            message: "Request body is too large. Maximum allowed size is 10KB"
        })
    }

    //Invalid JSON syntax
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body."
        })
    }

    //Hanlde other errors
    const statusCode =
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode < 500
            ? err.statusCode
            : 500

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? "Internal server error."
            : err.message || "Request failed."
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`TechHub Kenya API running on port ${PORT}`)
})
