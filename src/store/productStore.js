import { create } from "zustand"
import { persist } from "zustand/middleware"

const useProductStore = create(
    persist(
        (set) => ({
            products: [
                {
                    id: 1,
                    name: "HP EliteBook 840 G8",
                    brand: "HP",
                    category: "Laptops",
                    price: 89000,
                    oldPrice: 95000,
                    rating: 4.8,
                    reviews: 2,
                    stock: 12,
                    image: null
                },
                {
                    id: 2,
                    name: "Dell Latitude 7420",
                    brand: "Dell",
                    category: "Laptops",
                    price: 98000,
                    oldPrice: null,
                    rating: 4.5,
                    reviews: 2,
                    stock: 8,
                    image: null
                },
                {
                    id: 3,
                    name: "Logitech MX Master 3S",
                    brand: "Logitech",
                    category: "Accessories",
                    price: 14500,
                    oldPrice: 17000,
                    rating: 4.9,
                    reviews: 2,
                    stock: 30,
                    image: null
                },
                {
                    id: 4,
                    name: "Samsung 27-inch IPS Monitor",
                    brand: "Samsung",
                    category: "Monitors",
                    price: 32000,
                    oldPrice: null,
                    rating: 4.7,
                    reviews: 2,
                    stock: 15,
                    image: null
                }
            ],

            addProduct: (product) =>
                set((state) => ({
                    products: [
                        ...state.products,
                        {
                            ...product,
                            id: Date.now()
                        }
                    ]
                })),

            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product
                    )
                })),

            deleteProduct: (productId) =>
                set((state) => ({
                    products: state.products.filter(
                        (product) => product.id !== productId
                    )
                }))
        }),
        {
            name: "product-storage"
        }
    )
)

export default useProductStore