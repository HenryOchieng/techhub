import prisma from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import process from "node:process"

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            })
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Invalid inpud data"
            })
        }

        const normalizedName = name.trim()
        const normalizedEmail = email.trim().toLowerCase()

        if (!normalizedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Please provide a valid name and email address"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be atleast 8 characters long"
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists"
            })
        }

        const hasdPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                phone: phone?.trim() || null,
                password: hasdPassword,
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
            message: "Account created successfully",
            user
        })
    } catch (error) {
        console.error("Registration error:", error)

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "Email or phone number is already registered"
            })
        }

        return res.status(500).json({
            message: "Unable to create account"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment variables")

            return res.status(500).json({
                message: "Authentication service is not configured"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()

        const user = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatches) {
            return res.status(401).json({
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
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        )

        return res.status(200).json({
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
                message: "User account not found"
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        console.error("Get current user error", error)

        return res.status(500).json({
            message: "Unable to retrieve user profile"
        })
    }
}