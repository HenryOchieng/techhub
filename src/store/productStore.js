import { create } from "zustand"
import { persist } from "zustand/middleware"
import productService from "../services/productService"

import eliteBook from "../assets/products/hp/elitebook.jpg"
import eliteBookBack from "../assets/products/hp/elitebook-back.jpg"
import eliteBookSide from "../assets/products/hp/elitebook-side.jpg"
import eliteBookOpen from "../assets/products/hp/elitebook-open.jpg"
import dellLatitude from "../assets/products/dell/Dell.jpg"
import dellLat1 from "../assets/products/dell/Dell-open.jpg"
import dellLat2 from "../assets/products/dell/Dell-side.jpg"
import dellLat3 from "../assets/products/dell/Dell-back.jpg"
import mac from "../assets/products/Mac/MacBook.jpg"
import macA from "../assets/products/Mac/Mac1.jpg"
import macB from "../assets/products/Mac/Mac2.jpg"
import macC from "../assets/products/Mac/Mac3.jpg"
import logitechMX from "../assets/products/logitech/Logitech.jpg"
import logiTech1 from "../assets/products/logitech/Logitech-back.jpg"
import logiTech2 from "../assets/products/logitech/Logitech-front.jpg"
import logiTech3 from "../assets/products/logitech/Logitech-side.jpg"
import samsungMonitor from "../assets/products/monitor/Samsung.jpg"
import samMonitor1 from "../assets/products/monitor/Samsung-back.jpg"
import samMonitor2 from "../assets/products/monitor/Samsung-front.jpg"
import samMonitor3 from "../assets/products/monitor/Samsung-side.jpg"

const localProductImages = [
    {
        name: "HP EliteBook 840 G8",
        image: eliteBook,
        images: [
            eliteBook,
            eliteBookBack,
            eliteBookSide,
            eliteBookOpen
        ]
    },
    {
        name: "Dell Latitude 7420",
        image: dellLatitude,
        images: [
            dellLatitude,
            dellLat1,
            dellLat2,
            dellLat3
        ]
    },
    {
        name: "Apple MacBook Pro 16-inch",
        image: mac,
        images: [
            mac,
            macA,
            macB,
            macC
        ]
    },
    {
        name: "Logitech MX Master 3S",
        image: logitechMX,
        images: [
            logitechMX,
            logiTech1,
            logiTech2,
            logiTech3
        ]
    },
    {
        name: "Samsung 27-inch IPS Monitor",
        image: samsungMonitor,
        images: [
            samsungMonitor,
            samMonitor1,
            samMonitor2,
            samMonitor3
        ]
    }

]

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
            products: [],

            isLoading: false,
            error: null,

            fetchProducts: async () => {
                set({
                    isLoading: true,
                    error: null
                })

                try {
                    const response = await productService.getProducts()

                   const products = response.products.map((product) => {
                       const localProduct = localProductImages.find(
                           (item) =>
                               item.name.toLowerCase() === product.name.toLowerCase()
                       )

                        return {
                            ...product,

                            price: Number(product.price),
                            oldPrice: product.oldPrice
                                ? Number(product.oldPrice)
                                : null,

                            category: product.category?.name ?? "",

                            image: product.image || localProduct?.image || null,
                            images: Array.isArray(product.images) && product.images.length
                                ? product.images
                                : localProduct?.images || (product.image ? [product.image] : []),

                            reviews: Array.isArray(product.reviews)
                                ? product.reviews
                                : [],

                            specifications: product.specifications || {},

                            lowStockLevel: product.lowStockLevel ?? defaultLowStockLevel
                        }
                    })

                    set({
                        products,
                        isLoading: false,
                        error: null
                    })
                } catch (error) {
                    console.error("Failed to fetch products:", error)

                    set({
                        isLoading: false,
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Failed to load products"
                    })
                }
            },

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