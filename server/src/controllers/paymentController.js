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
