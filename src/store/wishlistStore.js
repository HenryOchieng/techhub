import { create } from "zustand"
import { persist } from "zustand/middleware"

const useWishlistStore = create(
    persist(
        (set) => ({
            wishlist: [],
            toggleWishlist: (product) =>
                set((state) => {
                    const exists = state.wishlist.find(
                        item => item.id === product.id
                    )

                    if (exists) {
                        return {
                            wishlist: state.wishlist.filter(
                                item => item.id !== product.id
                            )
                        }
                    }

                    return {
                        wishlist: [
                            ...state.wishlist,
                            product
                        ]
                    }
                }),
            removeFromWishlist: (productId) =>
                set((state) => ({
                    wishlist: state.wishlist.filter(
                        (item) => item.id !== productId
                    )
                }))
        }),
        {
            name: "wishlist-storage"
        }
    )
)

export default useWishlistStore