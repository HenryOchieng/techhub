import { Link } from "react-router-dom"
import {
    FiUser,
    FiPackage,
    FiHeart,
    FiShoppingCart,
    FiLogOut,
    FiChevronRight
} from "react-icons/fi"

function Account() {
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

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-[#0F172A] text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue flex items-center justify-center">
                            <FiUser className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-blue-400 font-semibold">
                                MY ACCOUNT
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold mt-1">
                                Welcome to Techhub
                            </h1>
                            <p className="text-slate-400 mt-2">
                                Manage your orders, wishlist and shopping ectivity.
                            </p>
                        </div>
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
                            Your account details will appear here once
                            authentication is connected.
                        </p>
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Name
                                </p>
                                <p className="font-semibold text-slate-900 mt-1">
                                    Guest User
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Email
                                </p>
                                <p className="font-semibold text-slate-900 mt-1">
                                    Not signed in
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Placeholder */}
                    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Ready to create an account?
                            </h3>
                            <p className="text-slate-600 mt-2">
                                Account registration and authentication will
                                be connected when we build the backend.
                            </p>
                        </div>
                        <button
                            disabled
                            className="inline-flex items-center justify-center gap-2 bg-slate-300 text-slate-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
                        >
                            <FiLogOut />
                            Sign In
                        </button>
                    </div>
                
                </div>
            </section>
        </div>
    )
}

export default Account