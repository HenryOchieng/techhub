import { NavLink, Outlet } from "react-router-dom"
import {
    FiGrid,
    FiShoppingBag,
    FiPackage,
    FiUsers,
    FiLayers,
    FiArrowLeft,
    FiMenu,
    FiX
} from "react-icons/fi"
import { useState } from "react"

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: FiGrid
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: FiShoppingBag
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: FiPackage
        },
        {
            name: "Customers",
            path: "/admin/customers",
            icon: FiUsers
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: FiLayers
        }
    ]

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Mobile Overlay*/}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0F172A] text-white border-r border-slate-800 transform transition-transform duration-300 ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >

                {/* Logo */}
                <div className="h-24 px-7 flex items-center justify-between border-b border-slate-700/70">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Tech<span className="text-blue-500">Hub</span>
                        </h1>
                        <p className="text-xs text-blue-400 font-semibold tracking-wider mt-1">
                            ADMIN PANEL
                        </p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white transition"
                    >
                        <FiX className="text-2xl" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="px-4 py-7">
                    <p className="px-3 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Management
                    </p>
                    <nav className="space-y-2">
                        {adminLinks.map((item) => {
                            const Icon = item.icon

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    end={item.path === "/admin"}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                                            isActive 
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon className="text-xl shrink-0" />
                                    <span>
                                        {item.name}
                                    </span>   
                                </NavLink>
                            )
                        })}
                    </nav>
                </div>
                
                {/* Back to Store */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/70">
                    <NavLink
                        to="/"
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        <FiArrowLeft className="text-xl shrink-0"/>
                        <span>
                            Back to Store
                        </span>  
                    </NavLink>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 min-w-0">

                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-5">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-slate-700 hover:text-blue-600 transition"
                    >
                        <FiMenu className="text-2xl" />
                    </button>
                    <div className="ml-4">
                        <p className="font-bold text-slate-900">
                            Admin Dashboard
                        </p>
                    </div>
                </header>

                {/* Page Content */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout