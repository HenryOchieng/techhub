import express from "express"
import { getInventoryHistory, getLowStockProducts, getOutOfStockProducts  } from "../controllers/inventoryController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

//All inventory reporting endpoints require admin access
router.use(authenticateToken, authorizeRoles("ADMIN"))

router.get("/history", getInventoryHistory)
router.get("/low-stock", getLowStockProducts)
router.get("/out-of-stock", getOutOfStockProducts)

export default router