import express from "express"
import { getCategories, createCategory } from "../controllers/categoryController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

//Public category browsing
router.get("/", getCategories)

//Admin category creation
router.post("/", authenticateToken, authorizeRoles("ADMIN"), createCategory)

export default router