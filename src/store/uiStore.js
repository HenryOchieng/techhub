import { create } from "zustand"

const useUIStore = create((set) =>({
    cartOpen: false,
    openCart: () => set({ cartOpen: true }),
    closeCart: () => set({ cartOpen: false }),
    toggleCart: () =>
        set((state) => ({
            cartOpen: !state.cartOpen,
        }))
}))

export default useUIStore