import { create } from "zustand"
import { persist } from "zustand/middleware"


import eliteBook from "../assets/products/hp/elitebook.jpg"
import eliteBookBack from "../assets/products/hp/elitebook-back.jpg"
import eliteBookSide from "../assets/products/hp/elitebook-side.jpg"
import eliteBookOpen from "../assets/products/hp/elitebook-open.jpg"
import dellLatitude from "../assets/products/dell/Dell.jpg"
import dellLat1 from "../assets/products/dell/Dell-open.jpg"
import dellLat2 from "../assets/products/dell/Dell-side.jpg"
import dellLat3 from "../assets/products/dell/Dell-back.jpg"
import logitechMX from "../assets/products/logitech/Logitech.jpg"
import logiTech1 from "../assets/products/logitech/Logitech-back.jpg"
import logiTech2 from "../assets/products/logitech/Logitech-front.jpg"
import logiTech3 from "../assets/products/logitech/Logitech-side.jpg"
import samsungMonitor from "../assets/products/monitor/Samsung.jpg"
import samMonitor1 from "../assets/products/monitor/Samsung-back.jpg"
import samMonitor2 from "../assets/products/monitor/Samsung-front.jpg"
import samMonitor3 from "../assets/products/monitor/Samsung-side.jpg"
//import { get } from "react-hook-form"

const defaultLowStockLevel = 5

export const getInventoryStatus = (product) => {
    const stock = Number(product.stock)
    const level = Number(product.lowStockLevel ?? defaultLowStockLevel)

    if (!Number.isFinite(stock) || stock <= 0) {
        return "Out of Stock"
    }

    if (stock <= level) {
        return "Low Stock"
    }

    return "In Stock"
}

const useProductStore = create(
    persist(
        (set, get) => ({
            products: [
                {
                    id: 1,
                    name: "HP EliteBook 840 G8",
                    brand: "HP",
                    category: "Laptops",
                    price: 89000,
                    oldPrice: 95000,
                    rating: 4.8,
                    reviews: [
                        {
                            id: 1,
                            user: "Steve",
                            rating: 5,
                            comment: "Excellent laptop. Fast and lightweight"
                        },
                        {
                            id: 2,
                            user: "Jane",
                            rating: 4,
                            comment: "Battery life is amazing"
                        }
                    ],
                    stock: 12,
                    image: eliteBook,
                    images: [
                        eliteBookBack,
                        eliteBookSide,
                        eliteBookOpen
                    ],
                    description: "The HP EliteBook 840 G8 is a premium business laptop designed for professionals seeking exceptional performance, security, and portability.",
                    specifications: {
                        processor: "Intel Core i5 11th Gen",
                        ram: "16GB DDR4",
                        storage: "512GB SSD",
                        graphics: "Intel Iris Xe",
                        display: '14" FHD IPS',
                        os: "Windows 11 Pro",
                        warranty: "1 Year"
                    }
                },
                {
                    id: 2,
                    name: "Dell Latitude 7420",
                    brand: "Dell",
                    category: "Laptops",
                    price: 98000,
                    oldPrice: null,
                    rating: 4.5,
                    reviews: [
                        {
                            id: 1,
                            user: "Steve",
                            rating: 5,
                            comment: "Excellent laptop. Fast and lightweight"
                        },
                        {
                            id: 2,
                            user: "Jane",
                            rating: 4,
                            comment: "Battery life is amazing"
                        }
                    ],
                    description: "A premium 14-inch business laptop designed for performance, portability, and productivity.",
                    specifications: {
                        processor: "11th Gen Intel® Core™ i5 or Core™ i7",
                        ram: "32GB DDR4",
                        storage: "1TB NVMe SSD",
                        graphics: "Intel® Iris Xe Graphics",
                        display: "14-inch Full HD (1920 × 1080) Anti-Glare",
                        os: "Windows 11 Pro",
                        warranty: "1 Year"
                    },
                    stock: 8,
                    image: dellLatitude,
                    images: [
                        dellLat1,
                        dellLat2,
                        dellLat3
                    ]
                },
                {
                    id: 3,
                    name: "Logitech MX Master 3S",
                    brand: "Logitech",
                    category: "Accessories",
                    price: 14500,
                    oldPrice: 17000,
                    rating: 4.9,
                    reviews: [
                        {
                            id: 1,
                            user: "Steve",
                            rating: 5,
                            comment: "Excellent laptop. Fast and lightweight"
                        },
                        {
                            id: 2,
                            user: "Jane",
                            rating: 4,
                            comment: "Battery life is amazing"
                        }
                    ],
                    stock: 30,
                    description: "A premium ergonomic wireless mouse with ultra-fast MagSpeed scrolling, quiet clicks, an 8,000 DPI sensor, and multi-device connectivity.",
                    specifications: {
                        sensor: "Darkfield high-precision sensor",
                        wirelessRange: "Up to 10 meters",
                        battery: "Built-in 500 mAh rechargeable Li-Po battery",
                        batteryLife: "Up to 70 days on a full charge",
                        chargingPort: "USB-C",
                        weight: "141g",
                        dimensions: "124.9 x 84.3 x 51 mm"
                    },
                    image: logitechMX,
                    images: [
                        logiTech1,
                        logiTech2,
                        logiTech3
                    ]
                },
                {
                    id: 4,
                    name: "Samsung 27-inch IPS Monitor",
                    brand: "Samsung",
                    category: "Monitors",
                    price: 32000,
                    oldPrice: null,
                    rating: 4.7,
                    reviews: [
                        {
                            id: 1,
                            user: "Steve",
                            rating: 5,
                            comment: "Excellent laptop. Fast and lightweight"
                        },
                        {
                            id: 2,
                            user: "Jane",
                            rating: 4,
                            comment: "Battery life is amazing"
                        }
                    ],
                    stock: 15,
                    description: "The Samsung 27-inch IPS Monitor features a 27-inch Full HD (1920 × 1080) IPS display that provides vibrant colors and consistent image quality from virtually any viewing angle (up to 178° horizontally and vertically).",
                    specifications: {
                        screenSize: "27 inches",
                        panelType: "IPS(In-Plane Switching)",
                        resolution: "Full HD (1920 x 1080)",
                        aspectRatio: "16:9",
                        refreshRate: "Up to 75 Hz",
                        ports: "HDMI, VGA (model-dependent)",
                        adaptiveSync: "AMD FreeSync (selected models)"
                    },
                    image: samsungMonitor,
                    images: [
                        samMonitor1,
                        samMonitor2,
                        samMonitor3
                    ]
                }
            ],

            addProduct: (product) =>
                set((state) => ({
                    products: [
                        ...state.products,
                        {
                            ...product,
                            id: product.id ?? Date.now(),
                            rating: product.rating ?? 0,
                            reviews: Array.isArray(product.reviews)
                                ? product.reviews
                                : [],
                            image: product.image || product.images?.[0] || null,
                            images: product.images?.length
                                ? product.images
                                : product.image
                                    ? [product.image]
                                    : [],
                        }
                    ]
                })),

            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === updatedProduct.id
                            ? { ...product, ...updatedProduct}
                            : product
                    )
                })),

            decreaseStock: (items) => {
                let success = false

                set((state) => {
                    const hasInsufficientStock = items.some((item) => {
                        const product = state.products.find(
                            (product) => String(product.id) === String(item.id)
                        )

                        const quantity = Number(item.quantity)

                        return (
                            !product ||
                            !Number.isInteger(quantity) ||
                            quantity <= 0 ||
                            !Number.isFinite(product.stock) ||
                            product.stock < quantity
                        )
                    })

                    if (hasInsufficientStock || items.length === 0) {
                        return state
                    }

                    success = true

                    return {
                        products: state.products.map((product) => {
                            const item = items.find(
                                (item) =>
                                    String(item.id) === String(product.id)
                            )

                            return item
                                ? {
                                    ...product,
                                    stock:
                                        product.stock - Number(item.quantity)
                                }
                                : product
                        })
                    }
                })

                return success
            },

            increaseStock: (items) => {
                let success = false

                set((state) => {
                    if (!Array.isArray(items) || items.length === 0) {
                        return true
                    }

                    const validItems = items.every((item) => {
                        const product = state.products.find(
                            (product) => String(product.id) === String(item.id)
                        )

                        const quantity = Number(item.quantity)

                        return (
                            product &&
                            Number.isInteger(quantity) &&
                            quantity > 0 &&
                            Number.isFinite(Number(product.stock))
                        )
                    })

                    if (!validItems) return state

                    success = true

                    return {
                        products: state.products.map((product) => {
                            const item = items.find(
                                (item) => String(item.id) === String(product.id)
                            )

                            return item
                                ? {
                                    ...product,
                                    stock: Number(product.stock) + Number(item.quantity),
                                }
                                : product
                        }),
                    }
                })

                return success
            },

            setLowStockLevel: (productId, level) => {
                if (!Number.isIntegre(level) || level < 0) {
                    return false
                }

                let updated = false

                set((state) => ({
                    products: state.products.map((product) => {
                        if (String(product.id) !== String(productId)) {
                            return product
                        }

                        updated = true

                        return {
                            ...product,
                            lowStockLevel: level,
                        }
                    }),
                }))

                return updated
            },

            getLowStockProducts: () => {
                return get().products.filter(
                    (product) => getInventoryStatus(product) === "Low Stock"
                )
            },

            getOutOfStockProducts: () => {
                return get().products.filter(
                    (product) => getInventoryStatus(product) === "Out of Stock"
                )
            },

            deleteProduct: (productId) =>
                set((state) => ({
                    products: state.products.filter(
                        (product) => String(product.id) !== String(productId)
                    )
                }))
        }),
        {
            name: "product-storage",

            merge: (persistedState, currentState) => {
                const persisted = persistedState ?? {}

                const persistedProducts = Array.isArray(persisted.products)
                    ? persisted.products
                    : currentState.products

                return {
                    ...currentState,
                    ...persisted,
                    products: persistedProducts.map((product) => ({
                        ...product,
                        lowStockLevel:
                            product.lowStockLevel ??
                            defaultLowStockLevel,
                    })),
                }
            },
        }
    )
)

export default useProductStore