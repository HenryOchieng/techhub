import { Link, useNavigate } from "react-router-dom"
import {
    FiUser,
    FiPackage,
    FiHeart,
    FiShoppingCart,
    FiLogOut,
    FiChevronRight
} from "react-icons/fi"
import { toast } from "react-hot-toast"
import useAuthStore from "../store/authStore"

function Account() {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    const navigate = useNavigate()
    const accountLinks = [
        {
            title: "My Orders",
            description: "View and manage your order",
            icon: FiPackage,
            path: "/orders"
        },
        {
            title: "My Wishlist",
            description: "View products you have saved",
            icon: FiHeart,
            path: "/wishlist"
        },
        {
            title: "My Cart",
            description: "View items currently in your cart",
            icon: FiShoppingCart,
            path: "/shop"
        }
    ]

    const handleLogout = () => {
        logout()
        toast.success("You have been signed out successfully.")
        navigate("/login", { replace: true })
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-[#0F172A] text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                                <FiUser className="text-3xl" />
                            </div>
                            <div>
                                <p className="text-blue-400 font-semibold">
                                    MY ACCOUNT
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold mt-1">
                                    Welcome, {user?.name || "Customer"}
                                </h1>
                                <p className="text-slate-400 mt-2">
                                    Manage your orders, wishlist and shopping activity.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                        >
                            <FiLogOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            </section>

            {/* Account Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        Account Dashboard
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {accountLinks.map((item) => {
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.title}
                                    to={item.path}
                                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-slate-100"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <Icon className="text-2xl" />
                                        </div>
                                        <FiChevronRight className="text-slate-400 group-hover:text-blue-600 transition" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mt-6">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 mt-2">
                                        {item.description}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Account Information */}
                    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h2 className="text-2xl font-bld text-slate-900">
                            Account Information
                        </h2>
                        <p className="text-slate-500 mt-2">
                           Your registerd account details.
                        </p>
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Name
                                </p>
                                <p className="font-semibold text-slate-900 mt-1">
                                    {user?.name || "Not available"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Email
                                </p>
                                <p className="font-semibold text-slate-900 mt-1">
                                    {user?.email || "Not available"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Phone Number
                                </p>
                                <p className="font-semibold text-slate-500 mt-1">
                                    {user?.phone || "Not provided"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-500">
                                    Account Type
                                </p>
                                <p className="font-semibold text-slate-900 mt-1">
                                    {user?.role === "ADMIN" ? "Administrator" : "Customer"}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Shopping Section */}
                    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Ready to shop?
                            </h3>
                            <p className="text-slate-600 mt-2">
                                Explore our latest computers and accessories.
                            </p>
                        </div>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            <FiShoppingCart />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Account