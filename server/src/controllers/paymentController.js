import prisma from "../config/db.js"

const paymentStatuses = [
    "PENDING",
    "PAID",
    "FAILED",
    "REFUNDED"
]

const allowedTransitions = {
    PENDING: ["PAID", "FAILED"],
    FAILED: ["PENDING", "PAID"],
    PAID: ["REFUNDED"],
    REFUNDED: []
}

export const getPayment = async (req, res) => {
    try {
        const { orderId } = req.params

        const payment = await prisma.payment.findFirst({
            where: {
                orderId,
                ...(req.user.role !== "ADMIN"
                    ? {
                        order: {
                            is: {
                                userId: req.user.id
                            }
                        }
                    }
                    : {}
                )
            },
            include: {
                order: {
                    select: {
                        id: true,
                        orderNumber: true,
                        customerName: true,
                        total: true,
                        status: true
                    }
                }
            }
        })

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: payment
        })
    } catch (error) {
        console.error("Get payment error:", error)

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve payment"
        })
    }
}

export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status, transactionId } = req.body

        if (!paymentStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status"
            })
        }

        if (
            transactionId !== undefined &&
            (typeof transactionId !== "string" || !transactionId.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Transaction ID must be a non-empty string"
            })
        }  

        const result = await prisma.$transaction(async (tx) => {
            const payment = await tx.payment.findUnique({
                where: { orderId },
                include: {
                    order: true
                }
            })

            if (!payment) {
                const error = new Error("Payment not found")
                error.statusCode = 404
                throw error
            }

            if (payment.status === status) {
                return payment
            }

            const allowed = allowedTransitions[payment.status]

            if (!allowed.includes(status)) {
                const error = new Error(
                    `Cannot change payment status from ${payment.status} to ${status}`
                )
                error.statusCode = 409
                throw error
            }

            if (
                status === "PAID" &&
                payment.order.status === "CANCELLED"
            ) {
                const error = new Error(
                    "Cannot mark payment as paid for a cancelled order"
                )
                error.statusCode = 409
                throw error
            }

            const updatedPayment = await tx.payment.update({
                where: { orderId },
                data: {
                    status,
                    ...(status === "PAID" && {
                        paidAt: new Date()
                    }),
                    ...(status === "REFUNDED" && {
                        paidAt: payment.paidAt
                    }),
                    ...(transactionId !== undefined && {
                        transactionId: transactionId.trim()
                    })
                }
            })

            if (
                status === "PAID" &&
                payment.order.status === "PENDING"
            ) {
                await tx.order.update({
                    where: { id: orderId },
                    data: {
                        status: "CONFIRMED"
                    }
                })
            }

            return updatedPayment
        })

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: result
        })
    } catch (error) {
        console.error("Update payment status error:", error)

        return res.status(error.statusCode || (
            error.code === "P2002" ? 409 : 500
        )).json({
            success: false,
            message: error.code === "P2002"
                ? "This transaction ID has already been used"
                : error.statusCode
                    ? error.message
                    : "Unable to update payment status"
        })
    }
}