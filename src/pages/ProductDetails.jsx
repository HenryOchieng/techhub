import { useState } from "react"
import { useParams } from "react-router-dom"
import { products } from "../data/products"
import { FiStar } from "react-icons/fi"
import useCartStore from "../store/cartStore"
import { FiHeart } from "react-icons/fi"
import useWishlistStore from "../store/wishlistStore"

function ProductDetails() {
    const { id } = useParams()

    const product = products.find(
        (item) => item.id === Number(id)
    )

    const [quantity, setQuantity] = useState(1)

    const addToCart = useCartStore((state) => state.addToCart)

    const toggleWishlist = useWishlistStore(
        (state) => state.toggleWishlist
    )

    const [selectedImage, setSelectedImage] = useState(product?.image || "")

    const [activeTab, setActiveTab] = useState("description")

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-6">
                <h1 className="text-3xl font-bold">
                    Product not found
                </h1>
            </div>
        )
    }
    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="gird lg:grid-cols-2 gap-12">

                {/* Left Side */}
                <div>
                    <img
                        key={selectedImage}
                        src={selectedImage}
                        alt={product.name}
                        className="w-full rounded-2xl border"
                        style={{ transition: "opacity 0.3s ease" }}
                    />
                </div>
                <div className="flex gap-3 mt-5">
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`border rounded-lg overflow-hidden ${
                                selectedImage === image
                                    ? "border-blue-600"
                                    : "border-slate-300"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                className="w-20 h-20 object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Right Side */}
                <div>
                    <p className="text-sm text-slate-500">
                        {product.brand}
                    </p>
                    <h1 className="text-4xl font-bold mt-2">
                        {product.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-3">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, index) => (
                                <FiStar key={index} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-slate-500">
                            ({product.reviews.length} Reviews)
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <span className="text-3xl font-bold text-blue-600">
                            KSHS. {product.price.toLocaleString()}
                        </span>
                        {product.oldPrice != null && (
                            <span className="line-through text-slate-400">
                                KSHS. {product.oldPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className="mt-5">
                        {product.stock > 0 ? (
                            <span className="text-green-600 font-semibold">
                                In Stock ({product.stock} available)
                            </span>
                        ) : (
                            <span className="text-red-600 font-semibold">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    {product.badge && (
                        <span className="inline-block mt-4 bg-red-600 text-white px-3 py-1 rounded-full">
                            {product.badge}
                        </span>
                    )}
                    <p className="mt-2 text-slate-500">
                        SKU: {product.sku}
                    </p>
                    <p className="mt-8 leading-7 text-slate-600">
                        {product.description}
                    </p>
                    <div className="mt-8">
                        <h3 className="fot-semibold mb-3">
                            Quantity
                        </h3>
                        <div className="flex item-center gap-4">
                            <button
                                onClick={() =>
                                    setQuantity((prev) => Math.max(1, prev - 1))
                                }
                                className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white transition"
                            >
                                -
                            </button>
                            <span className="text-xl font-bold w-10 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() =>
                                    setQuantity((prev) =>
                                    Math.min(product.stock, prev + 1))
                                }
                                className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            //for (let i = 0; i < quantity; i++) {
                                //addToCart(product, quantity)
                            //}
                            addToCart(product, quantity)
                        }}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl fent-semibold transition"
                    >
                        Add {quantity} to Cart
                    </button>
                    <button className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-xl font-semibold transition">
                        Buy Now
                    </button>
                    <button
                        onClick={() => toggleWishlist(product)}
                        className="w-full mt-4 flex items-center justify-center gap-2 border border-slate-300 py-4 rounded-xl hover:bg-slate-100 transition"
                    >
                        <FiHeart />
                        Add to Wishlist
                    </button>
                </div>
            </div>
            <div className="mt-16">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`px-6 py-4 font-semibold ${
                            activeTab === "description"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-slate-500"
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab("specifications")}
                        className={`px-6 py-4 font-semibold ${
                            activeTab === "specifications"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                :  "text-slate-500"
                        }`}
                    >
                        Specifications
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-6 py-4 font-semibold ${
                            activeTab === "reviews"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-slate-500"
                        }`}
                    >
                        Reviews     
                    </button>
                </div>
                {activeTab === "description" && (
                    <div className="py-8">
                        <p className="leading-8 text-slate-600">
                            {product.description}
                        </p>
                    </div>
                )}
                {activeTab === "specifications" && (
                    <div className="py-8">
                        <table className="w-full">
                            <tbody>
                                {Object.entries(product.specifications).map(
                                    ([key, value]) => (
                                        <tr
                                            key={key}
                                            className="border-b"
                                        >
                                            <td className="py-4 font-semibold">
                                                {key}
                                            </td>
                                            <td className="py-4 text-slate-600">
                                                {value}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "reviews" && (
                    <div className="py-8 space-y-6">
                        {product.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="font-semibold txt-lg">
                                    {review.user}
                                </h3>
                                <p className="text-yellow-500">
                                    {(review.rating)}
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FiStar
                                            key={index}
                                            className={`${
                                                index < review.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-slate-300"
                                            }`}
                                            size={18}
                                        />
                                    ))}
                                </div>
                                <p className="mt-3 text-slate-600 leading-7">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails