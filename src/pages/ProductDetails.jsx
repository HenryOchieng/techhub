import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import useProductStore from "../store/productStore"
import useCartStore from "../store/cartStore"
import { FiHeart } from "react-icons/fi"
import useWishlistStore from "../store/wishlistStore"
import Rating from  "../components/product/Rating"
import ProductCard from "../components/product/ProductCard"

function ProductDetails() {
    const { id } = useParams()

    const products = useProductStore((state) => state.products)
    
    const product = products.find(
        (item) => String(item.id) === id
    )

    const reviews = Array.isArray(product?.reviews) ? product.reviews : []

    const reviewCount = reviews.length

    const productImages = product 
        ? (
            product.images?.length
                ? product.images
                : product.image
                    ? [product.image]
                    : []
        )
        : []

    const [quantity, setQuantity] = useState(1)

    const addToCart = useCartStore((state) => state.addToCart)

    const toggleWishlist = useWishlistStore(
        (state) => state.toggleWishlist
    )

    const [selectedImage, setSelectedImage] = useState("")

    const mainImage = selectedImage || productImages[0] || ""

    const [activeTab, setActiveTab] = useState("description")

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900">
                    Product not found
                </h2>
                <p className="mt-3 text-slate-600">
                    This product may have been removed or is no longer available.
                </p>
                <Link
                    to="/shop"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Back to Shop
                </Link>
            </div>
        )
    }

    const relatedProducts = product
        ? products.filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .concat(products.filter(
            (item) =>
                item.category !== product.category &&
                item.id !== product.id
        )
        .filter((item, index, self) =>
            self.findIndex((p) => p.id === item.id) === index
        )
        .slice(0, 4)
    )
    : []

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                {/* Left Side */}
                <div className="w-full">
                    <div className="w-full aspect-square bg-white rounded-2xl border overflow-hidden flex items-center justify-center">
                        <img
                            key={mainImage}
                            src={mainImage || undefined }
                            alt={product.name}
                            className="w-full h-full object-contain"
                            style={{ transition: "opacity 0.3s ease" }}
                        />
                    </div>
                    {productImages.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-5">
                            {productImages.map((image, index) => (
                                <button
                                    key={`${product.id}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedImage(image)}
                                    aria-label={`View image ${index + 1} of ${product.name}`}
                                    className={`border-2 rounded-lg overflow-hidden ${
                                        mainImage === image
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
                    )}
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
                        <Rating
                            rating={product.rating || 0}
                            reviews={reviewCount}
                        />
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <span className="text-3xl font-bold text-blue-600">
                            KSHS. {Number(product.price || 0).toLocaleString()}
                        </span>
                        {Number(product.oldPrice) > Number(product.price) && (
                            <span className="line-through text-slate-400">
                                KSHS. {Number(product.oldPrice).toLocaleString()}
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
                        <h3 className="font-semibold mb-3">
                            Quantity
                        </h3>
                        <div className="flex items-center gap-4">
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
                                        Math.min(Number(product.stock || 0), prev + 1)
                                    )
                                }
                                className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        disabled={Number(product.stock || 0) <= 0}
                        onClick={() => {
                            addToCart(product, quantity)
                        }}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 diasbled:bg-slate-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition"
                    >
                        {Number(product.stock || 0) <= 0
                            ? "Out of Stock"
                            : `Add ${quantity} to Cart`
                        }
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
                        {product.specifications && 
                        Object.keys(product.specifications).length > 0 ? (
                            <table className="w-full">
                                <tbody>
                                    {Object.entries(product.specifications).map(
                                        ([key, value]) => (
                                            <tr key={key} className="border-b">
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
                        ) : (
                            <p className="text-slate-500 py-5">
                                No specifications available for this product.
                            </p>
                        )
                        }
                    </div>
                )}


                {activeTab === "reviews" && (
                    <div className="py-8">
                        {reviews.length > 0 ? (
                            <div className="space-y-6">
                                {reviews.map((review, index) => (
                                    <div
                                        key={review.id ?? index}
                                        className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                                    >
                                        <h3 className="font-semibold text-lg">
                                            {review.user || "Customer"}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-2">
                                            <Rating
                                                rating={review.rating || 0}
                                                size={16}
                                            />
                                        </div>
                                        <p className="mt-3 text-slate-600 leading-7">{review.comment || ""}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-slate-500">
                                    No reviews yet.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <section className="mt-5 bg-slate-50 rounded-3xl px-8 py-6">
                <h2 className="text-xl font-bold mb-8">
                    You May Also Like
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {relatedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ProductDetails