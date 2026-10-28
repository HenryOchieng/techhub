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

const normalizeIntentoryItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return null
    }

    const quantities = new Map()

    for (const item of items) {
        const productId = item.id ?? item.productId
        const quantity = Number(item.quantity)

        if (
            productId === null ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            return null
        }

        const key = String(productId)
        quantities.set(key, (quantities.get(key) ?? 0) + quantity)
    }

    return Array.from(quantities, ([id, quantity]) => ({
        id, quantity
    }))
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

            inventoryHistory: [],

            restockProduct: (productId, quantity, details = {}) => {
                const amount = Number(quantity)

                if (!Number.isInteger(amount) || amount <= 0) {
                    return false
                }

                let success = false

                set((state) => {
                    const product = state.products.find(
                        (item) => String(item.id) === String(productId)
                    )

                    if (!product || !Number.isFinite(Number(product.stock))) {
                        return state
                    }

                    const stockBefore = Number(product.stock)
                    const stockAfter = stockBefore + amount

                    success = true

                    const movement = {
                        id: crypto.randomUUID(),
                        productId: product.id,
                        productName: product.name,
                        type: "Restock",
                        quantity: amount,
                        stockBefore,
                        stockAfter,
                        date: new Date().toISOString(),
                        supplier: details.supplier?.trim() || "",
                        reference: details.reference?.trim() || "",
                        notes: details.notes?.trim() || "", 
                    }

                    return {
                        products: state.products.map((item) =>
                            String(item.id) === String(productId)
                                ? {...item, stock: stockAfter}
                                : item
                        ),
                        inventoryHistory: [
                            movement,
                            ...(state.inventoryHistory ?? []),
                        ],
                    }
                })

                return success
            },

            recordSale: (orderId, items) => {
                if (orderId == null || String(orderId).trim() === "") {
                    return false
                }

                const normalizedItems = normalizeIntentoryItems(items)

                if (!normalizedItems) {
                    return false
                }

                let success = false

                set((state) => {
                    const history = state.inventoryHistory ?? []
                    const orderKey = String(orderId)

                    const alreadyRecorded = history.some(
                        (movement) =>
                            movement.type === "Sale" &&
                            String(movement.orderId) === orderKey
                    )

                    if (alreadyRecorded) {
                        return state
                    }

                    const movements = []
                    const stockChanges = new Map()
                    const date = new Date().toISOString()

                    for (const item of normalizedItems) {
                        const product = state.products.find(
                            (product) => String(product.id) === item.id
                        )

                        if (
                            !product ||
                            !Number.isFinite(Number(product.stock)) ||
                            Number(product.stock) < item.quantity
                        ) {
                            return state
                        }

                        const stockBefore = Number(product.stock)
                        const stockAfter = stockBefore - item.quantity

                        stockChanges.set(item.id, stockAfter)

                        movements.push({
                            id: crypto.randomUUID(),
                            orderId: orderKey,
                            productId: product.id,
                            productName: product.name,
                            type: "Sale",
                            quantity: item.quantity,
                            stockBefore,
                            stockAfter,
                            date,
                            notes: `Stock deducted for ${orderKey}`,
                        })
                    }

                    success = true

                    return {
                        products: state.products.map((product) => {
                            const stockAfter = stockChanges.get(String(product.id))

                            return stockAfter === undefined
                                ? product
                                : { ...product, stock: stockAfter }
                        }),
                        inventoryHistory: [
                            ...movements,
                            ...history,
                        ],
                    }
                })

                return success
            },

            recordOrderCancellation: (orderId) => {
                if (orderId == null || String(orderId).trim() === "") {
                    return false
                }

                let success = false

                set((state) => {
                    const history = state.inventoryHistory ?? []
                    const orderKey = String(orderId)

                    const alreadyCancelled = history.some(
                        (movement) => 
                            movement.type === "Order Cancellation" &&
                            String(movement.orderId) === orderKey
                    )

                    if (alreadyCancelled) {
                        success = true
                        return state
                    }

                    const saleMovements = history.filter(
                        (movement) =>
                            movement.type === "Sale" &&
                            String(movement.orderId) === orderKey
                    )

                    const movementsToRestore = saleMovements.length > 0 ? saleMovements : null

                    if (!movementsToRestore?.length) {
                        return state
                    }

                    const stockChanges = new Map()
                    const cancellationMovements = []
                    const date = new Date().toISOString()

                    for (const movement of movementsToRestore) {
                        const key = String(movement.productId)
                        const product = state.products.find(
                            (item) => String(item.id) === key
                        )

                        if (
                            !product || 
                            !Number.isInteger(Number(movement.quantity)) ||
                            Number(movement.quantity) <= 0
                        ) {
                            return state
                        }

                        const stockBefore =
                            stockChanges.get(key) ?? Number(product.stock)

                        const quantity = Number(movement.quantity)
                        const stockAfter = stockBefore + quantity

                        stockChanges.set(key, stockAfter)

                        cancellationMovements.push({
                            id: crypto.randomUUID(),
                            orderId: orderKey,
                            productId: product.id,
                            productName: product.name,
                            type: "Order Cancellation",
                            quantity,
                            stockBefore,
                            stockAfter,
                            date,
                            note: `Stock restored for cancelled order ${orderKey}`,
                        })
                    }

                    success = true

                    return {
                        products: state.products.map((product) => {
                            const stockAfter = stockChanges.get(
                                String(product.id)
                            )

                            return stockAfter === undefined
                                ? product
                                : { ...product, stock: stockAfter }
                        }),
                        inventoryHistory: [
                            ...cancellationMovements,
                            ...history,
                        ],
                    }
                })

                return success
            },

            adjustStock: (productId, quantity, direction, details = {}) => {
                const amount = Number(quantity)

                if (
                    !Number.isInteger(amount) || 
                    amount <= 0 ||
                    !["increase", "decrease"].includes(direction)
                ) {
                    return false
                }

                let success = false

                set((state) => {
                    const product = state.products.find(
                        (item) => String(item.id) === String(productId)
                    )

                    if (!product || !Number.isFinite(Number(product.stock))) {
                        return state
                    }

                    const stockBefore = Number(product.stock)

                    if (direction === "decrease" && stockBefore < amount) {
                        return state
                    }

                    const stockAfter =
                        direction === "increase"
                            ? stockBefore + amount
                            : stockBefore - amount

                        const movement = {
                            id: crypto.randomUUID(),
                            productId: product.id,
                            productName: product.name,
                            type: "Adjustment",
                            adjustmentType: direction,
                            quantity: amount,
                            stockBefore,
                            stockAfter,
                            date: new Date().toISOString(),
                            reason: details.reason?.trim() || "",
                            reference: details.reference?.trim() || "",
                        }

                        success = true

                        return {
                            products: state.products.map((item) =>
                                String(item.id) === String(productId)
                                    ? {...item, stock:stockAfter}
                                    : item
                            ),
                            inventoryHistory: [
                                movement,
                                ...(state.inventoryHistory ?? []),
                            ],
                        }
                })

                return success
            },

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
                if (!Array.isArray(items) || items.length === 0) {
                    return false
                }

                let success = false

                set((state) => {
                    if (!Array.isArray(items) || items.length === 0) {
                        return state
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
                if (!Number.isInteger(level) || level < 0) {
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
                    inventoryHistory: Array.isArray(persisted.inventoryHistory)
                        ? persisted.inventoryHistory
                        : [],
                }
            },
        }
    )
)

export default useProductStore