import express from "express"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js"
import { restockProduct, adjustStock } from "../controllers/inventoryController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

//Public product browins
router.get("/", getProducts)

//Admin product management
router.post("/", authenticateToken, authorizeRoles("ADMIN"), createProduct)
router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateProduct)
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteProduct)

//Admin inventory management
router.post("/:id/restock", authenticateToken, authorizeRoles("ADMIN"), restockProduct)
router.post("/:id/adjust-stock", authenticateToken, authorizeRoles("ADMIN"), adjustStock)

export default router