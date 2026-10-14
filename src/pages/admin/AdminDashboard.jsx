import {
    FiDollarSign,
    FiShoppingBag,
    FiUsers,
    FiPackage,
    FiArrowUp,
    FiArrowDown
} from "react-icons/fi"
import useOrderStore from "../../store/orderStore"

function AdminDashboard() {
    const orders = useOrderStore((state) => state.orders)

    const latestOrders = [...orders]
        .sort((a, b) => {
            const dateA = new Date(
                a.orderDate ?? a.createdAt ?? a.date ?? 0
            ).getTime()

            const dateB = new Date(
                b.orderDate ?? b.createdAt ?? b.date ?? 0
            ).getTime()

            return dateB - dateA
        })
        .slice(0, 5)

    const totalOrders = orders.length

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending" 
    ).length

    const completedOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length

    const totalRevenue = orders
        .filter((order) => order.paymentStatus === "Paid")
        .reduce((total, order) => total + Number(order.total || 0), 0)

    const stats = [
        {
            title: "Total Revenue",
            value: `Kshs. ${totalRevenue.toLocaleString()}`,
            icon: FiDollarSign,
            change: `${completedOrders} completed`,
            positive: true
        },
        {
            title: "Total Orders",
            value: totalOrders.toLocaleString(),
            icon: FiShoppingBag,
            change: `${totalOrders} orders`,
            positive: true
        },
        {
            title: "Pending Order",
            value: pendingOrders.toLocaleString(),
            icon: FiUsers,
            change: `${pendingOrders} pending`,
            positive: false
        },
        {
            title: "Completed Orders",
            value: completedOrders.toLocaleString(),
            icon: FiPackage,
            change: `${completedOrders} completed`,
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

                            {latestOrders.map((order) => (
                                <tr
                                    key={order.orderNumber ?? order.id}
                                    className="hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        {order.orderNumber ?? order.id}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {order.customerName ??
                                            order.customer ??
                                            `${order.shippingDetails?.firstName ?? ""} ${order.shippingDetails?.lastName ?? ""}`.trim()
                                        }
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        Kshs. {Number(order.total || 0).toLocaleString()}
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