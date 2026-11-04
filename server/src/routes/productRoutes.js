import express from "express"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js"
import { restockProduct, adjustStock } from "../controllers/inventoryController.js"

const router = express.Router()

router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.post("/:id/restock", restockProduct)
router.post("/:id/adjust-stock", adjustStock)

export default router