import api from "./api"

const paymentService = {
    getPayment: async (orderId) => {
        const response = await api.get(`/payments/${orderId}`)
        return response.data
    },

    updatePaymentStatus: async (orderId, status, transactionId) => {
        const response = await api.patch(`/payments/${orderId}/status`, {
            status,
            ...(transactionId && { transactionId })
        })
        return response.data
    }
}

export default paymentService