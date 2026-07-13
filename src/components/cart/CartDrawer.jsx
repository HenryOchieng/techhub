import useCartStore from "../../store/cartStore"
import { motion } from "framer-motion"
import { FiX } from "react-icons/fi"
import useUIStore from "../../store/uiStore"
import { FiTrash2 } from "react-icons/fi"

function CartDrawer() {
    const cart = useCartStore(state => state.cart)

    const increaseQuantity = useCartStore(
        state => state.increaseQuantity
    )

    const decreaseQuantity = useCartStore(
        state => state.decreaseQuantity
    )

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const closeCart = useUIStore((state) => state.closeCart)

    const removeFromCart = useCartStore(
        state => state.removeFromCart
    )

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCart}
                className="fixed inset-0 bg-black/50 z-40" 
            />
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                }}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 p-6 overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        Shopping Cart
                    </h2>
                    <button
                        onClick={closeCart}
                        className="text-2xl hover:text-red-500"
                    >
                        <FiX />
                    </button>
                </div>
                
                {cart.length === 0 ? (
                    <div className="text-center py-16">
                        <img
                            src="/empty-cart.svg"
                            alt="Empty Cart"
                            className="w-48 mx-auto" 
                        />
                        <h3 className="text-xl font-semibold mt-6">
                            Your cart is empty
                        </h3>
                        <p className="text-slate-500 mt-2">
                            Start shopping and add your favorite products.
                        </p>
                    </div>
                ) : (
                    <>
                        {cart.map(item => (
                            <div
                                key={item.id}
                                className="flex gap-4 border-b py-6"
                            >
                                {/* Product Image */}
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />
                                    {item.badge && (
                                        <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {item.brand}
                                    </p>

                                    {/* Prices */}
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-blue-600 font-bold">
                                            KSHS. {item.price.toLocaleString()}
                                        </span>
                                        {item.oldPrice && (
                                            <span className="text-sm text-slate-400 line-through">
                                                KSHS. {item.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Quantity + Remove */}
                                    <div className="flex items-center justify-between mt-5">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-blue-600 hover:text-white transition"
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold w-6 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => increaseQuantity(item.id)}
                                                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-blue-600 hover:text-white transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                            title="Remove Item"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>

                                    {/* Line Total */}
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-sm text-slate-500">
                                            Item Total
                                        </span>
                                        <span className="font-bold text-lg">
                                            KSHS. {(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 border-t pt-6">
                            <div className="flex justify-between mb-3">
                                <span>
                                    Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                                </span>
                                <span>
                                    KSHS. {subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span>Shipping</span>
                                <span className="text-green=600 font-medium">
                                    FREE
                                </span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span>Tax</span>
                                <span>KSHS. 0</span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-blue-600">
                                    KSHS. {subtotal.toLocaleString()}
                                </span>
                            </div>
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition">
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={closeCart}
                                className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-xl transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </>
    )
}

export default CartDrawer