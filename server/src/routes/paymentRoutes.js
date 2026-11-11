import express from "express"

import { getPayment } from "../controllers/paymentController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.get("/:orderId", getPayment)

export default router