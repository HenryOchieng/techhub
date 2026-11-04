import express from "express"
import { getInventoryHistory, getLowStockProducts, getOutOfStockProducts  } from "../controllers/inventoryController.js"

const router = express.Router()

router.get("/history", getInventoryHistory)
router.get("/low-stock", getLowStockProducts)
router.get("/out-of-stock", getOutOfStockProducts)

export default router