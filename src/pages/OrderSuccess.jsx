import { motion } from "framer-motion"
import {
    FiCheck,
    FiShoppingBag,
    FiMapPin,
    FiCreditCard
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import useOrderStore from "../store/orderStore"
import useCartStore from "../store/cartStore"
import useCheckoutStore from "../store/checkoutStore"
import { useEffect } from "react"

function OrderSuccess() {
    const navigate = useNavigate()

    const currentOrder = useOrderStore(
        (state) => state.currentOrder
    )

    const clearCart = useCartStore(
        (state) => state.clearCart
    )

    const clearCheckout = useCheckoutStore(
        (state) => state.clearCheckout
    )

    useEffect(() => {
        if (currentOrder) {
            clearCart()
            clearCheckout()
        }
    }, [currentOrder, clearCart, clearCheckout])

    if (!currentOrder) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h1 className="text-3xl font-bold">
                    No Order Found
                </h1>

                <p className="text-slate-500 mt-3">
                    We couldn't find an order to display. 
                </p>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-8 bg-blue-600 hover:bg-700 text-white px-6 rounded-xl"
                >
                    Continue Shopping
                </button>
            </div>
        )
    }

    const {
        orderNumber,
        items,
        shippingDetails,
        paymentMethod,
        subtotal,
        shipping,
        total,
        orderDate
    } = currentOrder

    const estimatedDelivery = new Date(orderDate)

    estimatedDelivery.setDate(
        estimatedDelivery.getDate() + 2
    )

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">

            {/* Order Confirmation Header */}
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    tranistion={{
                        type: "spring",
                        stiffness: 200
                    }}
                    className="w-20 h-20 mx-auto rounded-full bg-green-100 flex iteme-center justify-center"
                >
                    <FiCheck
                        size={42}
                        className="text-green-600"
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mt-6"
                >
                    Thank You!
                </motion.h1>

                <p className="text-slate-500 mt-3">
                    Your order has been placed successfully.
                </p>

                <div className="mt-4">
                    <span className="text-sm text-slate-500">
                        Order Number
                    </span>

                    <p className="font-bold text-lg">
                        {orderNumber}
                    </p>
                </div>
            </div>

            {/* Main Order Details */}
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-12">

                {/* Left Column */}
                <div className="space-y-6">

                    {/* Products List */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <FiShoppingBag
                                size={22}
                                className="text-blue-600"
                            />

                            <h2 className="text-xl font-bold">
                                Order Items
                            </h2>
                        </div>
                        <div className="space-y-5">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-xl border"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {item.brand}
                                        </p>

                                        <p className="text-sm mt-2">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-semibold">
                                        Kshs.{" "}
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <FiMapPin
                                size={22}
                                className="text-blue-600"
                            />

                            <h2 className="text-xl font-bold">
                                Delivery Address
                            </h2>

                            <div className="space-y-1 text-slate-600">
                                <p className="font-semibold text-slate-900">
                                    {shippingDetails.firstName}{" "}
                                    {shippingDetails.lastName}
                                </p>
                                <p>
                                    {shippingDetails.phone}
                                </p>
                                <p>
                                    {shippingDetails.email}
                                </p>
                                <p className="pt-2">
                                    {shippingDetails.address}
                                </p>
                                <p>
                                    {shippingDetails.town},{" "}
                                    {shippingDetails.county}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Column */}
                <div>
                    <div className="bg-white rounded-2xl shadow p-5 stocky top-24">
                        <h2 className="text=xl font-bold mb-6">
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Subtotal
                                </span>
                                <span>
                                    Kshs.{" "}
                                    {subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Shipping
                                </span>
                                <span>
                                    {shipping === 0
                                        ? "FREE"
                                        : `Kshs. ${shipping.toLocaleString()}`
                                    }
                                </span>
                            </div>
                            <hr/>
                            <div className="flex justify-between text-xl font-bold">
                                <span>
                                    Total
                                </span>
                                <span className="text-blue-600">
                                    Kshs.{" "}
                                    {total.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="border-t mt-t pt-6">
                            <div className="flex items-center gap-3">
                                <FiCreditCard
                                    className="text-blue-600"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Payment Method
                                    </p>
                                    <p className="font-semibold">
                                        {paymentMethod}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Estimate */}
                    <div className="bg-blue-50 rounded-xl p-4 mt-6">
                        <p className="text-sm text-slate-500">
                            Estimated Delivery
                        </p>
                        <p className="font-bold text-blue-700 mt-1">
                            {estimatedDelivery.toLocaleString(
                                "en-KE",
                                {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long"
                                }
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                <button
                    onClick={() => navigate("/shop")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={() => navigate("/orders")}
                    className="border border-blue-600 text-blue hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                    View Orders
                </button>
            </div>
        </div>
    )
}

export default OrderSuccess