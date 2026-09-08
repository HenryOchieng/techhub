import {
    FiShoppingBag,
    FiUsers,
    FiDollarSign,
    FiPackage,
    FiArrowUp,
    FiArrowDown
} from "react-icons/fi"

function AdminDashBoard() {
    const stats = [
        {
            title: "Total Sales",
            value: "Kshs. 845,000",
            change: "+12.5%",
            positive: true,
            icon: FiDollarSign
        },
        {
            title: "Total Orders",
            value: "128",
            change: "+8.2%",
            positive: true,
            icon: FiShoppingBag
        },
        {
            title: "Customers",
            value: "76",
            change: "+5.4%",
            positive: true,
            icon: FiUsers
        },
        {
            title: "Products",
            value: "120",
            change: "-2.1%",
            positive: false,
            icon: FiPackage
        }
    ]

    return (
        <div className="min-h-screen bg-slate-100">
            
            {/* Header */}
            <div className="bg-[#0F172A] text-white">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <p className="text-blue-400 font-semibold">
                        ADMIN PANEL
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Overview of your TechHub Store.
                    </p>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Statistics */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <div
                                key={stat.title}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Icon className="text-2xl" />
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
                                <p className="text-slate-500 mt-5">
                                    {stat.title}
                                </p>
                                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                    {stat.value}
                                </h2>
                            </div>
                        )
                    })}
                </div>

                {/* Recent Orders */}
                <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900">
                            Recent Orders
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Latest orders placed in your store.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Order
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-semibold">
                                        #TH-1001
                                    </td>
                                    <td className="px-6 py-4">
                                        John Doe
                                    </td>
                                    <td className="px-6 py-4">
                                        Kshs. 98,000
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold">
                                        #TH-1000
                                    </td>
                                    <td className="px-6 py-4">
                                        Jane Smith
                                    </td>
                                    <td className="px-6 py-4">
                                        Kshs. 145,000
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold">
                                        #TH-999
                                    </td>
                                    <td className="px-6 py-4">
                                        Peter Otieno
                                    </td>
                                    <td className="px-6 py-4">
                                        Kshs. 32,000
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                            Processing
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminDashBoard