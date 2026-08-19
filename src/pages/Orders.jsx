import { FiPackage, FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import useOrderStore from "../store/orderStore"

function Orders() {
    const navigate = useNavigate()

    const orders = useOrderStore(
        (state) => state.orders
    )

    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <FiPackage
                    size={60}
                    className="mx-auto text-slate-400"
                />
                <h1 className="text-3xl font-bold mt-6">
                    No Orders Yet
                </h1>
                <p className="text-slate-500 mt-3">
                    You haven't placed any orders yet.
                </p>
                <button
                    onClick={() => navigate("/shop")}
                    className="mt-8 bg-blue hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Start Shopping
                </button>
            </div>
        )
    }

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

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h2 className="text-4xl font-bold">
                    My Orders
                </h2>
                <p className="text-slate-500 mt-2">
                    View and manage your recent orders.
                </p>
            </div>
            <div className="space-7-6">
                {orders
                    .slice()
                    .reverse()
                    .map((order) => (
                        <div
                            key={order.orderNumber}
                            className="bg-white rounded-2xl shadow-md p-6"
                        >
                            {/* Order Header */}
                            <div  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Order Number
                                    </p>
                                    <h2 className="font-bold text-lg">
                                        {order.orderNumber}
                                    </h2>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Order Date
                                    </p>
                                    <p className="font-medium">
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleString(
                                            "en-KE",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }
                                        )}
                                    </p>
                                </div>
                                <span className={`self-start md:self-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                                    order.status
                                )}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Order Body */}
                            <div className="py-6">
                                <div className="flex flex-wrap gap-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-15 h-16 object-cover rounded-xl border"
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Footer */}
                            <div className="border-t pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Payment
                                        </p>
                                        <p className="font-medium">
                                            {order.paymentMethod}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Total
                                        </p>
                                        <p className="font-bold text-blue-600">
                                            Kshs.{" "}
                                            {order.total.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        navigate(`/order/${order.orderNumber}`)
                                    }
                                    className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl font-semibold transition"
                                >
                                    View Order
                                    <FiChevronRight/>
                                </button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders