import { useState } from "react"
import {
    FiSearch,
    FiEye,
    FiX,
    FiMail,
    FiPhone,
    FiShoppingBag
} from "react-icons/fi"

function AdminCustomers() {

    const [customers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+254 712 345 678",
            registered: "10 Sep 2026",
            orders: 5,
            spent: 245000,
            status: "Active"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+254 723 456 789",
            registered: "05 Sep 2026",
            orders: 3,
            spent: 145000,
            status: "Active"
        },
        {
            id: 3,
            name: "Peter Otieno",
            email: "peter@example.com",
            phone: "+254 734 567 890",
            registered: "28 Aug 2026",
            orders: 1,
            spent: 32000,
            status: "Active"
        },
        {
            id: 4,
            name: "Mary Achieng",
            email: "mary@example.com",
            phone: "+254 745 678 901",
            registered: "15 Aug 2026",
            orders: 7,
            spent: 385000,
            status: "Active"
        },
        {
            id: 5,
            name: "David Ochieng",
            email: "david@example.com",
            phone: "+254 756 789 012",
            registered: "02 Aug 2026",
            orders: 0,
            spent: 0,
            status: "Inactive"
        }
    ])

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const filteredCustomers = customers.filter((customer) => {

        const matchesSearch =
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone.includes(search)

        const matchesStatus =
            statusFilter === "All" ||
            customer.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="p-5 lg:p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                    Customers
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage and view your store customers
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* Search */}
                    <div className="relative flex-1">

                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                </div>

            </div>

            {/* Customers Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="bg-slate-50 border-b border-slate-200">

                            <tr>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Customer
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Phone
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Registered
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Orders
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Total Spent
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>

                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {filteredCustomers.map((customer) => (

                                <tr
                                    key={customer.id}
                                    className="hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-5">

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {customer.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {customer.email}
                                            </p>
                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-sm text-slate-600">
                                        {customer.phone}
                                    </td>

                                    <td className="px-6 py-5 text-sm text-slate-600">
                                        {customer.registered}
                                    </td>

                                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                                        {customer.orders}
                                    </td>

                                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                                        Kshs. {customer.spent.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                customer.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {customer.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-right">

                                        <button
                                            onClick={() => setSelectedCustomer(customer)}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50 transition"
                                            aria-label="View customer"
                                        >
                                            <FiEye className="text-lg" />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Empty State */}
                {filteredCustomers.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        No customers found.
                    </div>
                )}

            </div>

            {/* Customer Details Modal */}
            {selectedCustomer && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSelectedCustomer(null)}
                    />

                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Customer Details
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Customer #{selectedCustomer.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                            >
                                <FiX className="text-xl" />
                            </button>

                        </div>

                        {/* Customer Info */}
                        <div className="p-6">

                            <div className="flex items-center gap-4 mb-6">

                                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                                    {selectedCustomer.name.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {selectedCustomer.name}
                                    </h3>

                                    <span className="text-sm text-slate-500">
                                        Registered {selectedCustomer.registered}
                                    </span>
                                </div>

                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">
                                    <FiMail className="text-slate-400" />

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Email
                                        </p>

                                        <p className="text-sm font-medium text-slate-900">
                                            {selectedCustomer.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FiPhone className="text-slate-400" />

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Phone
                                        </p>

                                        <p className="text-sm font-medium text-slate-900">
                                            {selectedCustomer.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FiShoppingBag className="text-slate-400" />

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Orders
                                        </p>

                                        <p className="text-sm font-medium text-slate-900">
                                            {selectedCustomer.orders} orders
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Spending */}
                            <div className="mt-6 p-4 bg-slate-50 rounded-xl">

                                <p className="text-sm text-slate-500">
                                    Total Spent
                                </p>

                                <p className="text-2xl font-bold text-slate-900 mt-1">
                                    Kshs. {selectedCustomer.spent.toLocaleString()}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}

export default AdminCustomers