import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiShoppingCart,
    FiHeart,
    FiMenu,
    FiX,
    FiSearch,
    FiUser
 } from "react-icons/fi"
import { useState } from "react"
import useCartStore from "../../store/cartStore"
import useWishlistStore from "../../store/wishlistStore"
import useUIStore from "../../store/uiStore"

 function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const location = useLocation()

    const navigate = useNavigate()

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

                        {/* Account */}
                        <button
                            onClick={() => navigate("/account")}
                            arial-label="Account"
                            className="text-white hover:text-cyan-400 transition"
                        >
                            <FiUser className="text-xl" />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        className="lg:hidden text-white text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        arial-label="Toggle Menu"
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

                        {/* Account */}
                        <button
                            onClick={() => {
                                closeMobileMenu()
                                navigate("/account")
                            }}
                            className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 text-white hover:text-cyan-400 transition"
                        >
                            <FiUser />
                            <span className="text-sm">
                                My Account
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
 }

 export default Navbar