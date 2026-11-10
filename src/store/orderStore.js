
import { create } from "zustand"
import orderService from "../services/orderService"
import paymentService from "../services/paymentService"

// Convert backend enum values to the existing frontend format.
const toFrontendStatus = (status) => {
    if (!status) return "Pending"

    return status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase()
}

const toBackendStatus = (status) => {
    return status.toUpperCase()
}

const paymentMethodLabels = {
    MPESA: "M-Pesa",
    CARD: "Credit/Debit Card",
    CASH_ON_DELIVERY: "Cash On Delivery",
}

// Normalize backend orders for compatibility with existing frontend pages.
const normalizeOrder = (order) => {
    if (!order) return null

    const payment = order.payment ?? {}

    return {
        ...order,

        id: order.id,
        orderNumber: order.orderNumber,

        customer: order.customerName,
        customerName: order.customerName,

        email: order.customerEmail,
        phone: order.customerPhone,

        paymentMethod:
            paymentMethodLabels[order.paymentMethod] ??
            paymentMethodLabels[payment.method] ??
            order.paymentMethod ??
            payment.method,

        paymentStatus: toFrontendStatus(payment.status),

        status: toFrontendStatus(order.status),

        items: (order.items ?? []).map((item) => ({
            ...item,
            name: item.productName ?? item.name,
            image: item.product?.image ?? item.image,
            price: Number(item.price),
            quantity: Number(item.quantity),
            subtotal: Number(item.subtotal),
        })),

        subtotal: Number(order.subtotal),
        shipping: Number(order.shippingFee ?? order.shipping ?? 0),
        total: Number(order.total),

        stockDeducted: order.stockDeducted,
        stockRestored: order.stockRestored,
    }
}

const findOrder = (orders, identifier) =>
    orders.find(
        (order) =>
            String(order.id) === String(identifier) ||
            String(order.orderNumber) === String(identifier)
    )

const useOrderStore = create((set, get) => ({
    orders: [],
    currentOrder: null,
    pagination: null,
    isLoading: false,
    error: null,

    // Fetch orders from the backend.
    fetchOrders: async (params = {}) => {
        set({ isLoading: true, error: null })

        try {
            const response = await orderService.getOrders(params)

            const orders = (response.data ?? []).map(normalizeOrder)

            set({
                orders,
                pagination: response.pagination ?? null,
                isLoading: false,
            })

            return true
        } catch (error) {
            console.error("Failed to fetch orders:", error)

            set({
                isLoading: false,
                error: error.response?.data?.message ??
                    "Failed to load orders.",
            })

            return false
        }
    },

    // Fetch one order using its database ID.
    fetchOrderById: async (id) => {
        try {
            const response = await orderService.getOrderById(id)
            const order = normalizeOrder(response.data)

            if (!order) return false

            set((state) => ({
                currentOrder: order,
                orders: [
                    order,
                    ...state.orders.filter(
                        (item) => String(item.id) !== String(order.id)
                    ),
                ],
            }))

            return order
        } catch (error) {
            console.error("Failed to fetch order:", error)
            return false
        }
    },

    // Create an order through the backend.
    createOrder: async (orderData) => {
        try {
            const response = await orderService.createOrder(orderData)
            const order = normalizeOrder(response.data)

            if (!order) return false

            set((state) => ({
                orders: [
                    order,
                    ...state.orders.filter(
                        (item) => String(item.id) !== String(order.id)
                    ),
                ],
                currentOrder: order,
            }))

            return order
        } catch (error) {
            console.error("Order creation failed:", error)

            return false
        }
    },

    // Update order fulfillment status.
    updateOrderStatus: async (identifier, status) => {
        const order = findOrder(get().orders, identifier)

        if (!order) {
            console.error("Order not found:", identifier)
            return false
        }

        if (status === "Cancelled") {
            return get().cancelOrder(order.id)
        }

        try {
            const response = await orderService.updateOrderStatus(
                order.id,
                toBackendStatus(status)
            )

            const updatedOrder = normalizeOrder(response.data)

            if (!updatedOrder) return false

            set((state) => ({
                orders: state.orders.map((item) =>
                    String(item.id) === String(order.id)
                        ? updatedOrder
                        : item
                ),

                currentOrder:
                    state.currentOrder &&
                    String(state.currentOrder.id) === String(order.id)
                        ? updatedOrder
                        : state.currentOrder,
            }))

            return true
        } catch (error) {
            console.error("Order status update failed:", error)
            return false
        }
    },

    // Update payment status through the backend.
    updatePaymentStatus: async (
        identifier,
        paymentStatus,
        transactionId
    ) => {
        const order = findOrder(get().orders, identifier)

        if (!order) {
            console.error("Order not found:", identifier)
            return false
        }

        try {
            await paymentService.updatePaymentStatus(
                order.id,
                toBackendStatus(paymentStatus),
                transactionId
            )

            // Fetch the updated order because a successful payment
            // may automatically confirm the order on the backend.
            const response = await orderService.getOrderById(order.id)
            const updatedOrder = normalizeOrder(response.data)

            if (!updatedOrder) return false

            set((state) => ({
                orders: state.orders.map((item) =>
                    String(item.id) === String(order.id)
                        ? updatedOrder
                        : item
                ),

                currentOrder:
                    state.currentOrder &&
                    String(state.currentOrder.id) === String(order.id)
                        ? updatedOrder
                        : state.currentOrder,
            }))

            return true
        } catch (error) {
            console.error("Payment status update failed:", error)
            return false
        }
    },

    // Cancel an order and let the backend restore inventory.
    cancelOrder: async (identifier) => {
        const order = findOrder(get().orders, identifier)

        if (!order) {
            console.error("Order not found:", identifier)
            return false
        }

        try {
            const response = await orderService.cancelOrder(order.id)
            const updatedOrder = normalizeOrder(response.data)

            if (!updatedOrder) return false

            set((state) => ({
                orders: state.orders.map((item) =>
                    String(item.id) === String(order.id)
                        ? updatedOrder
                        : item
                ),

                currentOrder:
                    state.currentOrder &&
                    String(state.currentOrder.id) === String(order.id)
                        ? updatedOrder
                        : state.currentOrder,
            }))

            return true
        } catch (error) {
            console.error("Order cancellation failed:", error)
            return false
        }
    },

    clearCurrentOrder: () =>
        set({ currentOrder: null }),

    clearOrders: () =>
        set({
            orders: [],
            currentOrder: null,
            pagination: null,
        }),
}))

export default useOrderStore
