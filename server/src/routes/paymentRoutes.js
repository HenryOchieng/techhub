import express from "express"

import { getPayment, updatePaymentStatus } from "../controllers/paymentController.js"

const router = express.Router()

router.get("/:orderId", getPayment)
router.patch("/:orderId/status", updatePaymentStatus)

export default router