import { create } from "zustand"
import { persist } from "zustand/middleware"
import useProductStore from "./productStore"

const useOrderStore = create(
    persist(
        (set, get) => ({
            orders: [],
            currentOrder: null,

            createOrder: (order) => 
                set((state) => ({
                    orders: [
                        ...state.orders,
                        order
                    ],
                    currentOrder: order 
                })),

            updateOrderStatus: (orderNumber, status) => 
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.orderNumber === orderNumber
                            ? { ...order, status}
                            : order
                    ),

                    currentOrder:
                        state.currentOrder?.orderNumber === orderNumber
                            ? {
                                ...state.currentOrder,
                                status
                            }
                            : state.currentOrder
                })),

            updatePaymentStatus: (orderNumber, paymentStatus) =>
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.orderNumber === orderNumber
                            ? {...order, paymentStatus}
                            : order
                    ),

                    currentOrder:
                        state.currentOrder?.orderNumber === orderNumber
                            ? {
                                ...state.currentOrder,
                                paymentStatus
                            }
                            : state.currentOrder
                })),

            clearCurrentOrder: () =>
                set({
                    currentOrder: null
                }),

            clearOrders: () =>
                set({
                    orders: [],
                    currentOrder: null
                }),

            cancelOrder: (orderNumber) => {
                const order = get().orders.find(
                    (item) => String(item.orderNumber ?? item.id) === String(orderNumber)
                )

                if (!order) {
                    console.error("Order not found:", orderNumber)
                    return false
                }

                if (!["Pending", "Confirmed"].includes(order.status)) {
                    console.warn("Order cannot be cancelled:", order.status)
                    return false
                }

                if (order.stockDeducted && !order.stockRestored) {
                    const increaseStock = useProductStore.getState().increaseStock

                    if (typeof increaseStock !== "function") {
                        console.error("IncreaseStock is unavailable.")
                        return false
                    }

                    const restored = increaseStock(order.items)

                    if (restored !== true) {
                        console.error("Stock restoration failed,", {
                            orderItems: order.items,
                            restored,
                        })
                        return false
                    }
                    
                    set((state) => ({
                        orders: state.orders.map((item) =>
                            String(item.orderNumber ?? item.id) === String(orderNumber)
                                ? {
                                    ...item,
                                    status: "Cancelled",
                                    stockRestored: item.stockDeducted === true ? true : item.stockRestored ?? false,
                                }
                                : item
                        ),

                        currentOrder:
                            state.currentOrder &&
                            String(state.currentOrder.orderNumber ?? state.currentOrder.id) === String(orderNumber)
                                ? {
                                    ...state.currentOrder,
                                    status: "Cancelled",
                                    stockRestored: state.currentOrder.stockDeducted === true ? true : state.currentOrder.stockRestored ?? false,
                                }
                                : state.currentOrder
                    }))

                    return true

                }
            }
        }),
        {
            name: "order-storage"
        }
    )
)

export default useOrderStore