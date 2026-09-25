import { useState } from "react"
import {
    FiSearch,
    FiEye,
    FiFilter
} from "react-icons/fi"

function AdminOrders() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")

    const orders = [
        {
            id: "TH-1001",
            customer: "John Doe",
            date: "14 Sep 2026",
            items: 2,
            total: 98000,
            paymentStatus: "Paid",
            status: "Pending"
        },
        {
            id: "TH-1000",
            customer: "Jane Smith",
            date: "13 Sep 2026",
            items: 3,
            total: "145000",
            paymentStatus: "Paid",
            status: "Processing"
        },
        {
            id: "TH-999",
            customer: "Peter Otieno",
            date: "12 Sep 2026",
            items: 1,
            total: 32000,
            paymentStatus: "Pending",
            status: "Pending"
        },
        {
            id: "TH-998",
            customer: "Mary Achieng",
            date: "11 Sep 2026",
            items: 4,
            total: 215000,
            paymentStatus: "Paid",
            status: "Completed"
        },
        {
            id: "TH-997",
            customer: "David Jacobs",
            date: "10 Sep 2026",
            items: 2,
            total: 76000,
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
                return "bg-wblue-100 text-blue-700"

            case "Pending":
                return "bg-yellow-100 text-yellow-700"

            case "Cancelled":
                return "bg-red-100 tect-red-700"

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
                                    className="hover:bg-slate-50 trasition"
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
                                        {order.items}
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
        </div>
    )
}

export default AdminOrders