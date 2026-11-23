import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiShoppingCart,
    FiHeart,
    FiMenu,
    FiX,
    FiSearch,
    FiUser,
    FiGrid,
    FiLogOut
 } from "react-icons/fi"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useCartStore from "../../store/cartStore"
import useWishlistStore from "../../store/wishlistStore"
import useUIStore from "../../store/uiStore"
import useAuthStore from "../../store/authStore";

 function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const logout = useAuthStore((state) => state.logout)

    const isAdmin = user?.role === "ADMIN"
    const accountPath = isAdmin ? "/admin" : "/account"

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Categories", path: "/categories" },
        { name: "Deals", path: "/deals" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
    ]

    const cart = useCartStore((state) => state.cart)

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity, 0
    )

    const wishlist = useWishlistStore(
        (state) => state.wishlist
    )

    const toggleCart = useUIStore(state => state.toggleCart)

    const closeMobileMenu = () => {
        setMenuOpen(false)
    }

    const goToShop = () => {
        closeMobileMenu()
        navigate("/shop")
    }

    const goToWishlist = () => {
        closeMobileMenu()
        navigate("/wishlist")
    }

    const goToAccount = () => {
        closeMobileMenu()
        navigate(accountPath)
    }

    const handleLogout = () => {
        closeMobileMenu()
        logout()
        toast.success("You have been signed out successfully.")
        navigate("/login", { replace: true })
    }

    return (
        <nav className="sticky top-0 z-50 bg-[#0F172A] shadow-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="text-3xl font-bold text-white tracking-wide"
                    >
                        Tech<span className="text-blue-400">Hub</span>
                    </Link>
                
                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-8 text-white font-medium">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.path

                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`transition duration-300 ${
                                            isActive 
                                                ? "text-cyan-400" 
                                                : "hover:text-cyan-400"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-5">

                        {/* Search */}
                        <button
                            onClick={goToShop}
                            aria-label="Search Products"
                            className="text-white hover:text-cyan-400 transition"
                        >
                            <FiSearch className="text-xl" />
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={goToWishlist}
                            arial-label="Wishlist"
                            className="relative text-white hover:text-cyan-400 transition"
                        >
                            <FiHeart className="text-xl" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </button>

                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            arial-label="Shopping cart"
                            className="relative text-white hover:text-cyan-400 transition"
                        >
                            <FiShoppingCart className="text-xl" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            <>
                                <button
                                    onClick={goToAccount}
                                    aria-label={isAdmin ? "Admin dashboard" : "My account"}
                                    className="flex items-center gap-2 text-white hover:text-cyan-400 tranisition"
                                >
                                    {isAdmin ? <FiGrid /> : <FiUser />}
                                    <span className="max-w-28 truncate text-sm">
                                        {user.name}
                                    </span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    aria-label="Sign out"
                                    title="Sign out"
                                    className="text-white hover:text-red-400 transition"
                                >
                                    <FiLogOut className="text-xl" />
                                </button>
                            </>
                        ):(
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-white hover:text-cyan-400 transition text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <button
                        className="lg:hidden text-white text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        arial-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-[#0F172A] border-t border-slate-700 pb-6">
                    <ul className="flex flex-col px-6 pt-5 gap-2">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.path
                            
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={closeMobileMenu}
                                        className={`block py-3 px-3 rounded-lg transition ${
                                            isActive
                                                ? "bg-slate-800 text-cyan-400"
                                                : "text-white hover:bg-slate-800 hover:text-cyan-400"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Mobile Actions */}
                    <div className="px-6 mt-5 pt-5 border-t border-slate-700">
                        <div className="grid grid-cols-3 gap-3">

                            {/* Search */}
                            <button
                                onClick={goToShop}
                                className="relative flex flex-col items-center gap-2 py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 transition"
                            >
                                <FiSearch className="text-xl" />
                                <span className="text-xs">
                                    Search
                                </span>
                            </button>

                            {/* WishList */}
                            <button
                                onClick={goToWishlist}
                                className="relative flex flex-col items-center gap-2 py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 transition"
                            >
                                <FiHeart className="text-xl" />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-1 right-5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                                <span className="text-xs">
                                    Wishlist
                                </span>
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => {
                                    closeMobileMenu()
                                    toggleCart()
                                }}
                                className="relative flex flex-col items-center gap-2 py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 transition"
                            >
                                <FiShoppingCart className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-5 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="text-xs">
                                    Cart
                                </span>
                            </button>
                        </div>
                        
                        {/* Mobile Authentication */}
                        {isAuthenticated && user ? (
                            <div className="mt-4 space-y-3">
                                <button
                                    onClick={goToAccount}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 transition"
                                >
                                    {isAdmin ? <FiGrid /> : <FiUser />}
                                    <span className="text-sm">
                                        {isAdmin ? "Admin Dashboard" : user.name}
                                    </span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                    <FiLogOut />
                                    <span className="text-sm">
                                        Sign Out
                                    </span>
                                </button>
                            </div>
                        ):(
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 trasition"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
 }

 export default Navbar