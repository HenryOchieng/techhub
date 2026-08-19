import { create } from "zustand"
import { persist } from "zustand/middleware"

const useOrderStore = create(
    persist(
        (set) => ({
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

            clearCurrentOrder: () =>
                set({
                    currentOrder: null
                }),

            clearOrders: () =>
                set({
                    order: [],
                    currentOrder: null
                }),

            cancelOrder: (orderNumber) =>
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.orderNumber === orderNumber && 
                        ["Pending", "Confirmed"].includes(order.status)
                            ? {
                                ...order,
                                status: "Cancelled"
                            }
                            : order
                    ),

                    currentOrder:
                        state.currentOrder?.orderNumber === orderNumber &&
                        ["Pending", "Confirmed"].includes(
                            state.currentOrder.status
                        )
                            ? {
                                ...state.currentOrder,
                                status: "Cancelled"
                            }
                            : state.currentOrder
                }))
        }),
        {
            name: "order-storage"
        }
    )
)

export default useOrderStore