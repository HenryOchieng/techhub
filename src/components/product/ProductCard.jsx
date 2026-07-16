import { FiHeart, FiShoppingCart } from "react-icons/fi"
import useCartStore from "../../store/cartStore"
import useWishlistStore from "../../store/wishlistStore"
import { Link } from "react-router-dom"
import Rating from "./Rating"


function ProductCard({ product }) {

    const addToCart = useCartStore((state) => state.addToCart)

    const toggleWishlist = useWishlistStore(
        (state) => state.toggleWishlist
    )

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 group ">
            <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-60 w-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                </Link>
                {product.badge && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="p-6">
                <p className="text-sm text-slate-500">
                    {product.brand}
                </p>
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mt-2">
                        {product.name}
                    </h3>
                </Link>
                <Rating
                    rating={product.rating}
                    reviews={product.reviews.length}
                    size={14}
                />
                <div className="flex items-center gap-3 mt-4">
                    <span className="text-blue-600 font-bold text-xl">
                        KSHS. {product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                        <span className="line-through text-slate-400">
                            KSHS. {product.oldPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2" onClick={() => addToCart(product)}>
                        <FiShoppingCart />
                        Add to Cart
                    </button>
                    <button className="border p-3 rounded-xl hover:bg-slate-100" onClick={() => toggleWishlist(product)}>
                        <FiHeart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard