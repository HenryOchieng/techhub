import "dotenv/config"
//import bcrypt from "bcryptjs"
import prisma from "../src/config/db.js"
import process from "node:process"

const createAdmin = async () => {
    try {
        const email = process.argv[2]?.trim().toLowerCase()

        if (!email) {
            throw new Error(
                "Please provide the email address of an existing user."
            )
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error(
                "User not found. Register account first."
            )
        }

        if (user.role === "ADMIN") {
            console.log("This account is already an administrator.")
            return
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { role: "ADMIN" }
        })

        console.log(`Administrator access granted to ${email}`)
    } catch (error) {
        console.error("Admin provisioning failed:", error.message)
        process.exitCode = 1
    } finally {
        await prisma.$disconnect()
    }
}

createAdmin()