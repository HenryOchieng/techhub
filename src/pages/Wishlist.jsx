import { Link } from "react-router-dom"
import { FiHeart, FiShoppingBag, FiTrash2, FiShoppingCart } from "react-icons/fi"
import useWishlistStore from "../store/wishlistStore"
import useCartStore from "../store/cartStore"

function Wishlist() {
    const wishlist = useWishlistStore((state) => state.wishlist)

    const toggleWishlist = useWishlistStore(
        (state) => state.toggleWishlist
    )

    const addToCart = useCartStore(
        (state) => state.addToCart
    )

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <FiHeart className="text-4xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mt-6">
                        Your Wishlist is Empty
                    </h1>
                    <p className="text-slate-600 mt-3">
                        Save products you love and come back to them later.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                    >
                        <FiShoppingBag />
                        Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen p-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-blue-600 font-semibold mb-2">
                        SAVED PRODUCTS
                    </p>
                    <h1 className="text-4xl font-bold text-slate-900">
                        My Wishlist
                    </h1>
                    <p className="text-slate-600 mt-3">
                        {wishlist.length}{" "}
                        {wishlist.length === 1
                            ? "product"
                            : "products"}{" "}
                        saved
                    </p>
                </div>

                {/* Wishlist Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
                        >

                            {/* Product Image */}
                            <Link to={`/product/${product.id}`}>
                                <div className="h-56 bg-slate-100 flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-6"
                                        />
                                    ) : (
                                        <FiShoppingBag className="text-5xl text-slate-300" />
                                    )}
                                </div>
                            </Link>

                            {/* Product Details */}
                            <div className="p-5">
                                <p className="text-sm text-slate-500">
                                    {product.brand}
                                </p>
                                <Link
                                    to={`/product/${product.id}`}
                                >
                                    <h2 className="font-semibold text-lg text-slate-900 mt-1 hover:text-blue-600 transition">
                                        {product.name}
                                    </h2>
                                </Link>
                                <div className="mt-5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-bold text-slate-900">
                                            Kshs. {Number(product.price || 0).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                                            arial-label={`Remove ${product.name} from wishlist`}
                                        >
                                            <FiTrash2/>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                                            product.stock <= 0
                                                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                    >
                                        <FiShoppingCart />
                                        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-10">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                    >
                        <FiShoppingBag />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Wishlist