import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="text-2xl font-bold text-white"
                        >
                            Tech<span className="text-blue-500">Hub</span>
                        </Link>
                        <p className="mt-4 loading-relaxed text-slate-400">
                            Your trusted destination for computers,
                            accessories, networking equipment, and
                            technology products.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                                arial-label="Facebook"
                            >
                                <FiFacebook/>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                                arial-label="Instagram"
                            >
                                <FiInstagram/>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                                arial-label="Instagram"
                            >
                                <FiTwitter/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg">
                            Quick Links
                        </h3>
                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/deals"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    Deals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-blue-400 ttansition"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold text-lg">
                            Customer Service
                        </h3>
                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    to="/orders"
                                    className="hover:text-blue-400 transition"
                                >
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-blue-400 transition"
                                >
                                    Contact Support 
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="hover:text-blue-400 transition"
                                >
                                    Shop Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/deals"
                                    className="hover:text-blue-400 transition"
                                >
                                    Current Deals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg">
                            Contact Us
                        </h3>
                        <div className="mt-5 space-y-4">
                            <div className="flex gap-3">
                                <FiPhone className="text-blue-500 mt-1 shrink-0" />
                                <span>
                                    +254 790 238 118
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <FiMail className="text-blue-500 mt-1 shrink-0" />
                                <span>
                                    support@techhub.com
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <FiMapPin className="text-blue-500 mt-1 shrink-0" />
                                <span>
                                    Kenya
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                        Copyright {new Date().getFullYear()} Techhub.
                        All Rights Reserved.
                    </p>
                    <div className="flex gap-5 text-sm">
                        <Link
                            to="#"
                            className="text-slate-500 hover:text-blue-400 transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="#"
                            className="text-slate-500 hover:text-blue-400 transition"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer