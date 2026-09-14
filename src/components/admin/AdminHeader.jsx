import {
    FiBell,
    FiUser,
    FiLogOut,
    FiMenu
} from "react-icons/fi"

function AdminHeader({ onMenuClick }) {
    return (
        <header className="h-20 bg-white border-b border-slate-200 px-5 lg:px-8 flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                    arial-labe="Open admin menu"
                >
                    <FiMenu className="text-xl" />
                </button>
                <div>
                    <p className="text-xs sm:text-sm text-slate-500">
                        Welcome Back
                    </p>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Admin Dashboard
                    </h2>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 sm:gap-5">

                {/* Notifications */}
                <button
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
                    arial-label="Notifications"
                >
                    <FiBell className="text-xl" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {/* Divider */}
                <div className="hidden sm:block h-8 w-px bg-slate-200" />

                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <FiUser className="text-xl" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            Admin
                        </p>
                        <p className="text-xs text-slate-500">
                            Administrator
                        </p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                    arial-label="Logout"
                >
                    <FiLogOut className="text-xl" />
                </button>
            </div>
        </header>
    )
}

export default AdminHeader