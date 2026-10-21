
import { create } from "zustand"
import { persist } from "zustand/middleware"
import useProductStore from "./productStore"

const orderStatusTransitions = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["Processing", "Cancelled"],
    Processing: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: [],
}

const paymentStatusTransitions = {
    Pending: ["Paid", "Failed"],
    Failed: ["Pending", "Paid"],
    Paid: ["Refunded"],
    Refunded: [],
}

const getOrderKey = (order) =>
    String(order.orderNumber ?? order.id)

const isCashOnDelivery = (order) =>
    order.paymentMethod === "Cash On Delivery"

const canFulfillOrder = (order) => {
    if (isCashOnDelivery(order)) {
        return ["Pending", "Paid"].includes(
            order.paymentStatus ?? "Pending"
        )
    }

    return order.paymentStatus === "Paid"
}

const useOrderStore = create(
    persist(
        (set, get) => ({
            orders: [],
            currentOrder: null,

            createOrder: (order) =>
                set((state) => ({
                    orders: [...state.orders, order],
                    currentOrder: order,
                })),

            updateOrderStatus: (orderNumber, status) => {
                const order = get().orders.find(
                    (item) =>
                        getOrderKey(item) === String(orderNumber)
                )

                if (!order) {
                    console.error("Order not found:", orderNumber)
                    return false
                }

                const allowedStatuses =
                    orderStatusTransitions[order.status] ?? []

                if (!allowedStatuses.includes(status)) {
                    console.warn(
                        `Invalid order status transition: ${order.status} -> ${status}`
                    )
                    return false
                }

                // Cancellation uses the existing stock-restoration logic.
                if (status === "Cancelled") {
                    return get().cancelOrder(orderNumber)
                }

                // Confirmed and all subsequent fulfillment statuses
                // require an eligible payment state.
                const fulfillmentStatuses = [
                    "Confirmed",
                    "Processing",
                    "Shipped",
                    "Delivered",
                ]

                if (
                    fulfillmentStatuses.includes(status) &&
                    !canFulfillOrder(order)
                ) {
                    console.warn(
                        "Order cannot progress until payment is eligible.",
                        {
                            orderNumber,
                            paymentMethod: order.paymentMethod,
                            paymentStatus: order.paymentStatus ?? "Pending",
                            requestedStatus: status,
                        }
                    )
                    return false
                }

                set((state) => ({
                    orders: state.orders.map((item) =>
                        getOrderKey(item) === String(orderNumber)
                            ? { ...item, status }
                            : item
                    ),

                    currentOrder:
                        state.currentOrder &&
                        getOrderKey(state.currentOrder) ===
                            String(orderNumber)
                            ? { ...state.currentOrder, status }
                            : state.currentOrder,
                }))

                return true
            },

            updatePaymentStatus: (orderNumber, paymentStatus) => {
                const order = get().orders.find(
                    (item) =>
                        getOrderKey(item) === String(orderNumber)
                )

                if (!order) {
                    console.error("Order not found:", orderNumber)
                    return false
                }

                const currentPaymentStatus =
                    order.paymentStatus ?? "Pending"

                const allowedStatuses =
                    paymentStatusTransitions[currentPaymentStatus] ?? []

                if (!allowedStatuses.includes(paymentStatus)) {
                    console.warn(
                        `Invalid payment status transition: ${currentPaymentStatus} -> ${paymentStatus}`
                    )
                    return false
                }

                if (
                    paymentStatus === "Failed" &&
                    order.status !== "Pending"
                ) {
                    console.warn(
                        "Payment cannot be marked Failed after order confirmation."
                    )
                    return false
                }

                
                if (
                    paymentStatus === "Refunded" &&
                    !["Cancelled", "Delivered"].includes(order.status)
                ) {
                    console.warn(
                        "Cancel or complete the order before recording a refund."
                    )
                    return false
                }

                const shouldConfirmOrder =
                    paymentStatus === "Paid" &&
                    order.status === "Pending" &&
                    !isCashOnDelivery(order)

                const updateOrder = {
                    ...order,
                    paymentStatus,
                    ...(shouldConfirmOrder ? { status: "Confirmed" } : {}),
                }

                set((state) => ({
                    orders: state.orders.map((item) =>
                        getOrderKey(item) === String(orderNumber)
                            ? updateOrder
                            : item
                    ),

                    currentOrder:
                        state.currentOrder &&
                        getOrderKey(state.currentOrder) === String(orderNumber)
                            ? updateOrder
                            : state.currentOrder,
                }))

                return true
            },

            clearCurrentOrder: () =>
                set({ currentOrder: null }),

            clearOrders: () =>
                set({
                    orders: [],
                    currentOrder: null,
                }),

            cancelOrder: (orderNumber) => {
                const order = get().orders.find(
                    (item) =>
                        getOrderKey(item) === String(orderNumber)
                )

                if (!order) {
                    console.error("Order not found:", orderNumber)
                    return false
                }

                if (!["Pending", "Confirmed"].includes(order.status)) {
                    console.warn(
                        "Order cannot be cancelled:",
                        order.status
                    )
                    return false
                }

                if (
                    order.stockDeducted === true &&
                    order.stockRestored !== true
                ) {
                    const increaseStock =
                        useProductStore.getState().increaseStock

                    if (typeof increaseStock !== "function") {
                        console.error("increaseStock is unavailable.")
                        return false
                    }

                    const restored = increaseStock(order.items)

                    if (restored !== true) {
                        console.error("Stock restoration failed.", {
                            orderItems: order.items,
                            restored,
                        })
                        return false
                    }
                }

                const updatedOrder = {
                    ...order,
                    status: "Cancelled",
                    stockRestored:
                        order.stockDeducted === true
                            ? true
                            : order.stockRestored ?? false,
                }

                set((state) => ({
                    orders: state.orders.map((item) =>
                        getOrderKey(item) === String(orderNumber)
                            ? updatedOrder
                            : item
                    ),

                    currentOrder:
                        state.currentOrder &&
                        getOrderKey(state.currentOrder) ===
                            String(orderNumber)
                            ? updatedOrder
                            : state.currentOrder,
                }))

                return true
            },
        }),
        {
            name: "order-storage",
        }
    )
)

export default useOrderStore
