import { create } from "zustand"
import toast from "react-hot-toast"

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => 
        set((state) => {
            const existing = state.cart.find(
                item => item.id === product.id
            )

            if (existing) {
                toast.success(`Added another ${product.name}`)
                return {
                    cart: state.cart.map(item =>
                        item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                    ),
                }
            }
            toast.success(`${product.name} added to cart`)

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
            set((state) => {
                toast.success("Item was removed from cart")
                 return {
                    cart: state.cart.filter((item) => item.id !== id)
                }
            }),

        clearCart: () => {
            toast.success("Cart Cleared")
            set({ cart: [] })
        },
}))

export default useCartStore