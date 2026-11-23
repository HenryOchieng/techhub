import express from "express"

import {
    getPayment,
    updatePaymentStatus
} from "../controllers/paymentController.js"
import {
    authenticateToken,
    authorizeRoles
} from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.get("/:orderId", getPayment)
router.patch(
    "/:orderId/status",
    authorizeRoles("ADMIN"),
    updatePaymentStatus
)

export default router