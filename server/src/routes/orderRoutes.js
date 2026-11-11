import express from "express"
import { createOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder } from "../controllers/orderController.js"
import { authenticateToken, authorizeRoles} from "../middleware/authMiddleware.js"

const router = express.Router()

//Authenticate all order operations
router.use(authenticateToken)

//Customers and admins can creeate orders 
router.post("/", createOrder)

//Customers and admins can access orders
router.get("/", getOrders)
router.get("/:id", getOrderById)

//Only admins can update order status
router.patch("/:id/status", authorizeRoles("ADMIN"), updateOrderStatus)

//Customers can cancel their own orders
//Admin can manage cancellations
router.patch("/:id/cancel", cancelOrder)

export default router