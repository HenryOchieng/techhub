
import prisma from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Buffer } from "node:buffer"
import process from "node:process"

const isValidEmail = (email) => {
    return (
        email.length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )
}

const isValidKenyanPhone = (phone) => {
    const normalizedPhone = phone.replace(/[\s()-]/g, "")

    return /^(?:\+254|254|0)[17]\d{8}$/.test(normalizedPhone)
}

const isValidPassword = (password) => {
    const passwordBytes = Buffer.byteLength(password, "utf8")

    return (
        password.length >= 8 &&
        password.trim().length > 0 &&
        passwordBytes <= 72
    )
}

export const registerUser = async (req, res) => {
    try {
        const body = req.body

        if (
            !body ||
            typeof body !== "object" ||
            Array.isArray(body)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            })
        }

        const { name, email, phone, password } = body

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required as valid strings"
            })
        }

        const normalizedName = name.trim()
        const normalizedEmail = email.trim().toLowerCase()

        if (
            !normalizedName ||
            normalizedName.length > 80
        ) {
            return res.status(400).json({
                success: false,
                message: "Name must contain between 1 and 80 characters"
            })
        }

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            })
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters and must not exceed 72 UTF-8 bytes"
            })
        }

        let normalizedPhone = null

        if (phone !== undefined && phone !== null) {
            if (
                typeof phone !== "string" ||
                !phone.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number must be a valid string"
                })
            }

            normalizedPhone = phone.trim()

            if (!isValidKenyanPhone(normalizedPhone)) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid Kenyan phone number"
                })
            }

            normalizedPhone = normalizedPhone.replace(/[\s()-]/g, "")
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                phone: normalizedPhone,
                password: hashedPassword,
                role: "CUSTOMER"
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true
            }
        })

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user
        })

    } catch (error) {
        console.error("Registration error:", error)

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Email or phone number is already registered"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Unable to create account"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const body = req.body

        if (
            !body ||
            typeof body !== "object" ||
            Array.isArray(body)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            })
        }

        const { email, password } = body

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password ||
            password.trim().length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        if (
            Buffer.byteLength(password, "utf8") > 72
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment variables")

            return res.status(500).json({
                success: false,
                message: "Authentication service is not configured"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()

        if (!isValidEmail(normalizedEmail)) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: process.env.JWT_EXPIRES_IN || "1d",
                algorithm: "HS256"
            }
        )

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        })

    } catch (error) {
        console.error("Login error:", error)

        return res.status(500).json({
            success: false,
            message: "Unable to log in"
        })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.error("Get current user error:", error)

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve user profile"
        })
    }
}
