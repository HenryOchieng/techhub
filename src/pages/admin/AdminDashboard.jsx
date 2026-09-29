import {
    FiDollarSign,
    FiShoppingBag,
    FiUsers,
    FiPackage,
    FiArrowUp,
    FiArrowDown
} from "react-icons/fi"

function AdminDashboard() {

    // Temporary frontend data
    const orders = [
        {
            id: "TH-1001",
            customer: "John Doe",
            total: 98000,
            status: "Pending"
        },
        {
            id: "TH-1000",
            customer: "Jane Smith",
            total: 145000,
            status: "Processing"
        },
        {
            id: "TH-999",
            customer: "Peter Otieno",
            total: 32000,
            status: "Pending"
        },
        {
            id: "TH-998",
            customer: "Mary Achieng",
            total: 215000,
            status: "Completed"
        }
    ]

    const products = [
        {
            id: 1,
            name: "HP EliteBook 840 G8",
            stock: 12
        },
        {
            id: 2,
            name: "Dell Latitude 7420",
            stock: 8
        },
        {
            id: 3,
            name: "Logitech MX Master 3S",
            stock: 30
        },
        {
            id: 4,
            name: "Samsung 27-inch IPS Monitor",
            stock: 15
        }
    ]

    const customers = [
        {
            id: 1,
            name: "John Doe"
        },
        {
            id: 2,
            name: "Jane Smith"
        },
        {
            id: 3,
            name: "Peter Otieno"
        },
        {
            id: 4,
            name: "Mary Achieng"
        },
        {
            id: 5,
            name: "David Ochieng"
        }
    ]

    // Calculate dashboard statistics
    const totalSales = orders.reduce(
        (total, order) => total + order.total,
        0
    )

    const totalOrders = orders.length

    const totalCustomers = customers.length

    const totalProducts = products.length

    const stats = [
        {
            title: "Total Sales",
            value: `Kshs. ${totalSales.toLocaleString()}`,
            icon: FiDollarSign,
            change: "+12.5%",
            positive: true
        },
        {
            title: "Total Orders",
            value: totalOrders,
            icon: FiShoppingBag,
            change: "+8.2%",
            positive: true
        },
        {
            title: "Customers",
            value: totalCustomers,
            icon: FiUsers,
            change: "+5.4%",
            positive: true
        },
        {
            title: "Products",
            value: totalProducts,
            icon: FiPackage,
            change: "+2.1%",
            positive: true
        }
    ]

    return (
        <div className="p-5 lg:p-8">

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="text-slate-500 mt-1">
                    Here's what's happening with your store.
                </p>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {stats.map((stat) => {

                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="bg-white border border-slate-200 rounded-2xl p-6"
                        >

                            <div className="flex items-center justify-between">

                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Icon className="text-xl" />
                                </div>

                                <span
                                    className={`flex items-center gap-1 text-sm font-semibold ${
                                        stat.positive
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stat.positive
                                        ? <FiArrowUp />
                                        : <FiArrowDown />
                                    }

                                    {stat.change}
                                </span>

                            </div>

                            <p className="text-sm text-slate-500 mt-5">
                                {stat.title}
                            </p>

                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {stat.value}
                            </p>

                        </div>
                    )
                })}

            </div>

            {/* Recent Orders */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-200">

                    <h2 className="text-lg font-bold text-slate-900">
                        Recent Orders
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Latest orders placed in your store
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Order
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Customer
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Amount
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        {order.id}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {order.customer}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        Kshs. {order.total.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "Processing"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default AdminDashboard