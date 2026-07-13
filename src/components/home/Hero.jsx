import { motion } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"

function Hero() {
    return (
        <section className="bg-slate-50 min-h[85vh] flex items-center">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Section */}

                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .8 }}
                >

                    <p className="uppercase tracking-widest text-blue-600 font-semibold mb-3">
                        Welcome to TechHub Kenya
                    </p>

                    <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                        Upgrade Your
                        <span className="text-blue-600">
                            {" "}Tech Experience
                        </span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-600 leading-8">
                        Discover laptops, desktop computers,
                        monitors, networking equipment,
                        printers and accessories from the world's
                        leading brands
                    </p>

                    <div className="mt-10 flex gap-5 flex-wrap">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                            Shop Now
                        </button>
                        <button className="border-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition flex items-center gap-2">
                            Browse Products
                            <FiArrowRight />
                        </button>
                    </div>

                </motion.div>

                {/* Right Secctiion */}

                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .8}}
                >
                    <img
                        src="/src/assets/images/hero-laptop.jpg"
                        alt="Laptop"
                        className="rounded-3xl shadow-2xl"
                    />

                </motion.div>
            
            </div>
        </section>
    )
}

export default Hero