import { Link } from "react-router-dom";
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

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Categories", path: "/Categories" },
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

    return (
        <nav className="sticky top-0 z-50 bg-[#0F172A] shadow-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}

                    <Link
                        to="/"
                        className="text-3xl font-bold text-white tracking-wide"
                    >
                        TechHub
                    </Link>
                    {/* Desktop Menu */}

                    <ul className="hidden lg:flex gap-8 text-white font-medium">
                        {navLinks.map((item) => (
                            <li key={item.name}>
                                <Link
                                    className="hover:text-cyan-400 duration-300"
                                    to={item.path}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* Right Icons */}

                    <div className="hidden lg:flex items-center gap-5">
                        <FiSearch className="text-white text-xl cursor-pointer hover:text-cyan-400"/>
                        <div className="relative">
                            <FiHeart className="text-white text-xl cursor-pointer hover:text-cyan-400"/>
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <button 
                                onClick={toggleCart}
                                className="relative"

                            >
                                <FiShoppingCart className="text-white text=xl hover:text-cyan-400" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}

                            </button>
                        </div>
                        <FiUser className="text-white text-xl cursot-pointer hover:text-cyan-400"/>
                    </div>

                    {/* Mobile Menu */}

                    <button
                        className="lg:hidden text-white text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="lg:hidden bg-[#0F172A] pb-6">
                    <ul className="flex flex-col px-6 gap-5">
                        {navLinks.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="text-white hover:text-cyan-400"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
 }

 export default Navbar