import { create } from "zustand"

const useWishlistStore = create((set) => ({
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
        })
}))

export default useWishlistStore