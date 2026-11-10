import api from "./api"

const inventoryService = {
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