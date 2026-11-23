import api from "./api"

const inventoryService = {
    restockProduct: async (productId, details) => {
        const response = await api.post(
            `/products/${productId}/restock`,
            details
        )
        return response.data
    },

    adjustStock: async (productId, details) => {
        const response = await api.post(
            `/products/${productId}/adjust-stock`,
            details
        )
        return response.data
    },

    getInventoryHistory: async (params = {}) => {
        const response = await api.get("/inventory/history", { params })
        return response.data
    },

    getLowStockProducts: async () => {
        const response = await api.get("/inventory/low-stock")
        return response.data
    },

    getOutOfStockProducts: async () => {
        const response = await api.get("/inventory/out-of-stock")
        return response.data
    },
}

export default inventoryService