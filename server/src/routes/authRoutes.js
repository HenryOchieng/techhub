import express from "express"
import { registerUser, loginUser, getCurrentUser, getCustomers } from "../controllers/authController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/me", authenticateToken, getCurrentUser)
router.get("/customers", authenticateToken, authorizeRoles("ADMIN"), getCustomers)

export default router