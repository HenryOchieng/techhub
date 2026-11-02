import { create } from "zustand"
import { persist } from "zustand/middleware"
import toast from "react-hot-toast"

const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product, quantity = 1) => 
                set((state) => {
                    const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1))

                    const stock = Number(product.stock)

                    if (Number.isFinite(stock) && stock <= 0) {
                        toast.error(`${product.name} is out of stock`)
                        return state
                    }

                    const existing = state.cart.find(
                        item => item.id === product.id
                    )

                    const currentQuantity = existing ? Number(existing.quantity) || 0 : 0

                    const newQuantity = Number.isFinite(stock)
                        ? Math.min(currentQuantity + requestedQuantity, stock)
                        : currentQuantity + requestedQuantity

                    const quantityAdded = newQuantity - currentQuantity

                    if (quantityAdded <= 0) {
                        toast.error(`Only ${stock} units of ${product.name} are available`)
                        return state
                    }

                    if (existing) {
                        toast.success(`${quantityAdded} ${product.name} added to cart`)
                        return {
                            cart: state.cart.map(item =>
                                item.id === product.id
                                ? {
                                    ...item,
                                    quantity: newQuantity
                                }
                                : item
                            ),
                        }
                    }
                    toast.success(`${quantityAdded} ${product.name} added to cart`)

                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...product,
                                quantity: newQuantity
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
                    set((state) => {
                        if (state.cart.length === 0) {
                            return state
                        }

                        toast.success("Cart Cleared")

                        return { cart: []}
                    })
                }
        }),
        {
            name: "cart-storage"
        }
    )
)

export default useCartStore