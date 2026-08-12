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
            
                clearCurrentOrder: () =>
                    set({
                        currentOrder: null
                    }),

                clearOrders: () =>
                    set({
                        orders: [],
                        currentOrder: null
                    })
        }),
        {
            name: "order-storage"
        }
    )
)

export default useOrderStore