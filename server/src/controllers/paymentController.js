import prisma from "../config/db.js"

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

const allowedPaymentTransitions = {
    PENDING: ["PAID", "FAILED"],
    FAILED: ["PENDING", "PAID"],
    PAID: ["REFUNDED"],
    REFUNDED: []
}

export const updatePaymentStatus = async (req, res) => {
    const { orderId } = req.params
    const body =
        req.body &&
        typeof req.body === "object" &&
        !Array.isArray(req.body)
            ? req.body
            : {}
    const { status, transactionId } = body

    if (
        typeof status !== "string" ||
        !Object.prototype.hasOwnProperty.call(allowedPaymentTransitions, status)
    ) {
        return res.status(400).json({
            success: false,
            message: "A valid payment status is required"
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

    try {
        const payment = await prisma.$transaction(async (tx) => {
            const currentPayment = await tx.payment.findUnique({
                where: { orderId }
            })

            if (!currentPayment) {
                const error = new Error("Payment not found")
                error.statusCode = 404
                throw error
            }

            if (
                currentPayment.status !== status &&
                !allowedPaymentTransitions[currentPayment.status]?.includes(status)
            ) {
                const error = new Error(
                    `Cannot change payment status from ${currentPayment.status} to ${status}`
                )
                error.statusCode = 409
                throw error
            }

            return tx.payment.update({
                where: { orderId },
                data: {
                    status,
                    paidAt: status === "PAID"
                        ? currentPayment.paidAt ?? new Date()
                        : status === "PENDING"
                            ? null
                            : currentPayment.paidAt,
                    ...(transactionId !== undefined
                        ? { transactionId: transactionId.trim() }
                        : {})
                }
            })
        })

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: payment
        })
    } catch (error) {
        console.error("Update payment status error:", error)

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Transaction ID is already in use"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Unable to update payment status"
        })
    }
}
