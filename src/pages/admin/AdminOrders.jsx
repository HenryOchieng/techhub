import { useState } from "react"
import {
    FiSearch,
    FiEye,
    FiFilter, 
    FiX,
    FiPackage
} from "react-icons/fi"

function AdminOrders() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedOrder, setSelectedOrder] = useState(null)

    const orders = [
        {
            id: "TH-1001",
            customer: "John Doe",
            date: "14 Sep 2026",
            items: [
                {
                    id: 1,
                    name: "HP EliteBook 840 G8",
                    quantity: 1,
                    price: 89000,
                    image: null
                },
                {
                    id: 2,
                    name: "Logitech MX Master 3S",
                    quantity: 1,
                    price: 14500,
                    image: null
                }
            ],
            total: 98000,
            paymentMethod: "M-Pesa",
            paymentStatus: "Paid",
            status: "Pending"
        },
        {
            id: "TH-1000",
            customer: "Jane Smith",
            date: "13 Sep 2026",
            items: [
                {
                    id: 3,
                    name: "Dell Latitude 7420",
                    quantity: 1,
                    price: 98000,
                    image: null
                },
                {
                    id: 4,
                    name: "Logitech MX Master 3S",
                    quantity: 2,
                    price: 14500,
                    image: null
                }
            ],
            total: "127000",
            paymentMethod: "Credit/Debit Card",
            paymentStatus: "Paid",
            status: "Processing"
        },
        {
            id: "TH-999",
            customer: "Peter Otieno",
            date: "12 Sep 2026",
            items: [
                {
                    id: 5,
                    name: "Samsung 27-inch IPS Monitor",
                    quantity: 1,
                    price: 32000,
                    image: null
                }
            ],
            total: 32000,
            paymentMethod: "Cash On Delivery",
            paymentStatus: "Pending",
            status: "Pending"
        },
        {
            id: "TH-998",
            customer: "Mary Achieng",
            date: "11 Sep 2026",
            items: [
                {
                    id: 6,
                    name: "HP EliteBook 840 G8",
                    quantity: 2,
                    price: 8900,
                    image: null
                },
                {
                    id: 7,
                    name: "Logitech MX Master 3S",
                    quantity: 2,
                    price: 14500,
                    image: null
                }
            ],
            total: 207000,
            paymentMethod: "M-Pesa",
            paymentStatus: "Paid",
            status: "Completed"
        },
        {
            id: "TH-997",
            customer: "David Jacobs",
            date: "10 Sep 2026",
            items: [
                {
                    id: 8,
                    name: "Dell Latitude 7420",
                    quantity: 1,
                    price: 98000,
                    image: null
                }
            ],
            total: 98000,
            paymentMethod: "M-Pesa",
            paymentStatus: "Paid",
            status: "Cancelled"
        }
    ]

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.toLowerCase().includes(search.toLowerCase())
          
        const matchesStatus = 
            statusFilter === "All" ||
            order.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-700"

            case "Processing":
                return "bg-blue-100 text-blue-700"

            case "Pending":
                return "bg-yellow-100 text-yellow-700"

            case "Cancelled":
                return "bg-red-100 text-red-700"

            default:
                return "bg-slate-100 text-slate-700"
        }
    }

    const getPaymentStyle = (status) => {
        return status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
    }

    return (
        <div className="p-6 lg:p-8">

            {/* Page Header */}
            <div className="mb-8">
                <p className="text-blue-600 font-semibold text-sm">
                    MANAGEMENT
                </p>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">
                    Orders
                </h1>
                <p className="text-slate-500 mt-2">
                    Vew and manage customer orders.
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                    {/* Search */}
                    <div className="relative w-full lg:max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search order or customer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-3">
                        <FiFilter className="text-slate-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-blue-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">
                        All Orders
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {filteredOrders.length} orders found
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Order
                                </th>
                                <th className="py-6 px-4 text-sm font-semibold text-slate-600">
                                    Customer
                                </th>
                                <th className="py-6 px-4 text-sm font-semibold text-slate-600">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Items
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Payment
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                            <tbody className="divide-y divide-slate-100">
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-slate-50 transition"
                                >
                                    <td className="px-6 py-5 font-semibold text-slate-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-5 text-slate-700">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-5 text-slate-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-5 text-slate-700">
                                        {order.items.reduce(
                                            (total, item) => total + item.quantity,
                                            0
                                        )}
                                    </td>
                                    <td className="px-6 py-5 font-semibold text-slate-900 whitespace-nowrap">
                                        Kshs. {Number(order.total).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStyle(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                            aria-label={`View order ${order.id}`}
                                        >
                                            <FiEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-1 text-center text-slate-500"
                                    >
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSelectedOrder(null)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Order Details
                                </p>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    #{selectedOrder.id}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition"
                                aria-label="Close order details"
                                >
                                    <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Order Information */}
                        <div className="p-6 space-y-8">

                            {/* Summary */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Order Information
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Order Date
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedOrder.date}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Customer
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedOrder.customer}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Payment
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedOrder.paymentStatus}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Status
                                        </p>
                                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Customer Information
                                </h3>
                                <div className="bg-slate-50 rounded-xl p-5">
                                    <p className="font-semibold text-slate-900">
                                        {selectedOrder.customer}
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Customer information will be connected to the
                                        user account when the backend is implemented.
                                    </p>
                                </div>
                            </div>

                            {/* Products */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Products Ordered
                                </h3>
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    {selectedOrder.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 border-b last:border-b-0 border-slate-200"
                                        >
                                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <FiPackage className="text-slate-400 text-2xl" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-slate-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-slate-900">
                                                    Kshs. {Number(item.price).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment & Total */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Payment Information
                                </h3>
                                <div className="bg-slate-50 rounded-xl p-5 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Payment Method
                                        </span>
                                        <span className="font-semibold text-slate-900">
                                            {selectedOrder.paymentMethod}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Payment Status
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStyle(
                                                selectedOrder.paymentStatus
                                            )}`}
                                        >
                                            {selectedOrder.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-4 flex justify-between">
                                        <span className="font-bold text-slate-900">
                                            Order Total
                                        </span>
                                        <span className="text-xl font-bold text-blue-600">
                                            Kshs.{" "}
                                            {Number(
                                                selectedOrder.total || 0
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrders