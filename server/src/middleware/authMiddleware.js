
import jwt from "jsonwebtoken"
import process from "node:process"
import prisma from "../config/db.js"

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (
        typeof authHeader !== "string" ||
        !/^Bearer\s+\S+$/i.test(authHeader)
    ) {
        return res.status(401).json({
            success: false,
            message: "A valid Bearer authentication token is required"
        })
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim()

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing")

        return res.status(500).json({
            success: false,
            message: "Authentication service is not configured"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        )

        if (
            typeof decoded !== "object" ||
            decoded === null ||
            typeof decoded.sub !== "string" ||
            decoded.sub.trim().length === 0 ||
            !["CUSTOMER", "ADMIN"].includes(decoded.role)
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            })
        }

        // Verify that the account still exists and retrieve its current role
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.sub
            },
            select: {
                id: true,
                role: true
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Account no longer exists"
            })
        }

        if (!["CUSTOMER", "ADMIN"].includes(user.role)) {
            return res.status(401).json({
                success: false,
                message: "Invalid account role"
            })
        }

        req.user = {
            id: user.id,
            role: user.role
        }

        next()
    } catch (error) {
        if (error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError") {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired authentication token"
            })
        }

        console.error("Authentication error:", error)

        return res.status(500).json({
            success: false,
            message: "Authentication service error"
        })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource"
            })
        }

        next()
    }
}
