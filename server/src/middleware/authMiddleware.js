import jwt from "jsonwebtoken"
import process from "node:process"

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Authentication token is required"
        })
    }

    const token = authHeader.split(" ")[1]

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing")

        return res.status(500).json({
            message: "Authentication servie is not configured"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.sub || !decoded.role) {
            return res.status(401).json({
                message: "Invalid authentication token"
            })
        }

        req.user = {
            id: decoded.sub,
            role: decoded.role
        }

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired authentication token", error
        })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to access this resource"
            })
        }

        next()
    }
}