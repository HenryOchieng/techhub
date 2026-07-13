import { create } from "zustand"

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => 
        set((state) => {
            const existing = state.cart.find(
                item => item.id === product.id
            )

            if (existing) {
                return {
                    cart: state.cart.map(item =>
                        item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                    )
                }
            }

            return {
                cart: [
                    ...state.cart,
                    {
                        ...product,
                        quantity: 1
                    }
                ]
            }
        }),

        increaseQuantity: (id) =>
            set((state) => ({
                cart: state.cart.map(item =>
                    item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                   : item 
                )
            })),
        decreaseQuantity: (id) =>
            set((state) => ({
                cart: state.cart
                    .map(item =>
                        item.id === id
                            ? {
                                ...item,
                                quantity: item.quantity - 1
                            }
                        : item
                    )
                    .filter(item => item.quantity > 0)
            })),
        removeFromCart: (id) =>
            set((state) => ({
                cart: state.cart.filter(
                    item => item.id !== id
                )
            })),
        clearCart: () => set({ car: [] })
}))

export default useCartStore