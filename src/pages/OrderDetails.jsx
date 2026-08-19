import { useState } from "react"
import { FiArrowLeft, FiCheck, FiMapPin, FiCreditCard, FiPackage } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import useOrderStore from "../store/orderStore"

function OrderDetails () {
    const { orderNumber } = useParams()
    const navigate = useNavigate()

    const orders = useOrderStore(
        (state) => state.orders
    )

    const order = orders.find(
        (item) => item.orderNumber === orderNumber
    )

    const updateOrderStatus = useOrderStore(
        (state) => state.updateOrderStatus
    )

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700"

            case "Confirmed":
                return "bg-blue-100 text-blue-700"

            case "Processing":
                return "bg-purple-100 text-purple-700"

            case "Shipped":
                return "bg-orange-100 text-orange-700"

            case "Delivered":
                return "bg-green-100 text-green-700"

            case "Cancelled":
                return "bg-red-100 text-red-700"

            default:
                return "bg-slate-100 text-slate-600"
        }
    }

    const cancelOrder = useOrderStore(
        (state) => state.cancelOrder
    )

    const canCancel = ["Pending", "Confirmed"].includes(order.status)

    const [showCancelModal, setShowCancelModal] = useState(false)


    if (!order) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <FiPackage
                    size={60}
                    className="mx-auto text-slate-400"
                />
                <h1 className="text-3xl fnt-bold mt-6">
                    Order Not Found
                </h1>
                <p className="text-slate-500 mt-3">
                    We couldn't find the order you're looking for.
                </p>
                <button
                    onClick={() => navigate("/orders")}
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                    Back to my orders.
                </button>
            </div>
        )
    }

    const statusSteps = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered"
    ]

    const currentStatusIndex =  statusSteps.indexOf(order.status)

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            {/* Back Button */}
            <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition mb-8"
            >
                <FiArrowLeft />
                Back to my orders.
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <div>
                    <p className="text-sm text-slate-500">
                        Order Number
                    </p>
                    <h1 className="text-3xl font-bold">
                        {order.orderNumber}
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Placed on{" "}
                        {new Date(order.orderDate).toLocaleDateString(
                            "en-KE",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            }
                        )}
                    </p>
                </div>
                <span className={`self-start px-5 py-2 rounded-full font-semibold ${getStatusStyle(
                    order.status
                )}`}>
                    {order.status}
                </span>
            </div>

            {/* Order Status */}
            {order.status === "Cancelled" ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h3 className="font-bold text-red-700">
                        Order Cancelled
                    </h3>
                    <p className="text-sm text-red-600 mt-1">
                        This order has been cancelled and will not be processed.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow p-6 mb-8">
                    <h2 className="text-xl font-bold mb-8">
                        Order Status
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center">
                        {statusSteps.map((step, index) => {
                            const completed = index <= currentStatusIndex
                            return (
                                <div
                                    key={step}
                                    className="flex md:flex-1 items-center"
                                >
                                    <div className="flex md:flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                completed
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-slate-200 text-slate-400"
                                            }`}
                                        >
                                            {completed ? (
                                                <FiCheck />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <span className={`ml-4 md:ml-0 md:mt-3 text-sm font-medium text-center ${
                                            completed
                                                ? "text-blue-600"
                                                : "text-slate-400"
                                        }`}
                                        >
                                            {step}   
                                        </span>
                                    </div>
                                    {index < statusSteps.length -1 && (
                                        <div
                                            className={`hidden md:block flex-1 h-1 mx-4 ${
                                                index < currentStatusIndex
                                                    ? "bg-blue-600"
                                                    : "bg-slate-200"
                                            }`}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>     
            )}

            {/* Temporary Order Status Selector */}
            <div className="mt-8 border-t pt-6">
                <p className="text-sm text-slate-500 mb-2">
                    Test Order Status (For Development Only)
                </p>
                <select
                    value={order.status}
                    onChange={(e) => 
                        updateOrderStatus(
                            order.orderNumber,
                            e.target.value
                        )
                    }
                    className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-blue-600"
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            {/* Cancel Order */}
            {canCancel && (
                <div className="bg-white rounded-2xl shadow p-6 mb-8">
                    <h2 className="text-lg font-bold">
                        Cancel Order
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">
                        You can cancel this order while it is still
                        pending or confimed.
                    </p>
                    <button
                        onClick={() => {
                            setShowCancelModal(true)
                        }}
                        className="mt-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-3 rounded-xl font-semibold transition"
                    >
                        Cancel Order
                    </button>
                </div>
            )}

            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

                {/* Left Column */}
                <div className="space-y-8">

                    {/* Products */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font0bold mb-6">
                            Order Items
                        </h2>
                        <div className="space-y-6">
                            {order.items.map((item) =>(
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-xl border"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {item.brand}
                                        </p>
                                        <p className="text-sm mt-2">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="text-blue-600 font-bold mt-2">
                                            Kshs.{" "}
                                            {item.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="font-bold">
                                        Kshs.{" "}
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <FiMapPin
                                size={22}
                                className="text-blue-600"
                            />
                            <h2 className="text-xl font-bold">
                                Delivery Address
                            </h2>
                        </div>
                        <div className="space-y-1 text-slate-600">
                            <p className="font-semibold text-slate-900">
                                {order.shippingDetails.firstName}{" "}
                                {order.shippingDetails.lastName}
                            </p>
                            <p>
                                {order.shippingDetails.phone}
                            </p>
                            <p>
                                {order.shippingDetails.email}
                            </p>
                            <p className="pt-2">
                                {order.shippingDetails.address}
                            </p>
                            <p>
                                {order.shippingDetails.town},{" "}
                                {order.shippingDetails.county}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold mb-6">
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="flex jusitify-between">
                                <span className="text-slate-500">
                                    Subtotal: 
                                </span>
                                <span>
                                    Kshs.{" "}
                                    {order.subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Shipping
                                </span>
                                <span>
                                    {order.shipping === 0
                                        ? "FREE"
                                        : `Kshs. ${order.shipping.toLocaleString()}`
                                    }
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between text-xl font-bold">
                                <span>
                                    Total
                                </span>
                                <span className="text-blue-600">
                                    Kshs.{" "}
                                    {order.total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <FiCreditCard
                                size={22}
                                className="text-blue-600"
                            />
                            <h2 className="text-xl font-bold">
                                Payment
                            </h2>
                        </div>
                        <p className="text-sm textslate-500">
                            Payment Method
                        </p>
                        <p className="font-semibold mt-1">
                            {order.paymentMethod}
                        </p>
                    </div>
                </div>
            </div>
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold">
                            Cancel Order?
                        </h2>
                        <p className="text-slate-500 mt-3">
                            Are you sure you want to cancel order{" "}
                            <span className="font-semibold text-slate-700">
                                {order.orderNumber}
                            </span>
                            ?
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                            This action cannot be undone
                        </p>
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="border border-slate-300 text-slate-600 hover:bg-slate-100 px-5 py-3 rounded-xl font-semibold transition"
                            >
                                Keep Order
                            </button>
                            <button
                                onClick={() => {
                                    cancelOrder(order.orderNumber)
                                    setShowCancelModal(false)
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition"
                            >
                                Yes, Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderDetails