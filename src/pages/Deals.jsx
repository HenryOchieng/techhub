import { useMemo, useState } from "react"
import ProductCard from "../components/product/ProductCard"
import { products } from "../data/products"

function Deals() {
    const [sortBy, setSortBy] = useState("discount")

    const deals = products.filter(
        (product) =>
            product.oldPrice &&
            product.oldPrice > product.price
    )

    const sortedDeals = useMemo(() => {
        const sorted = [...deals]

        switch (sortBy) {
            case "price-low":
                return sorted.sort(
                    (a, b) => a.price - b.price
                )

            case "price-high":
                return sorted.sort(
                    (a, b) => b.price - a.price
                )

            case "rating":
                return sorted.sort(
                    (a, b) => b.rating - a.rating
                )

            case "discount":
            default:
                return sorted.sort((a, b) => {
                    const discountA = 
                        ((a.oldPrice - a.price) / a.oldPrice) * 100

                    const discountB = 
                        ((b.oldPrice - b.price) / b.oldPrice) * 100

                    return discountB - discountA
                })
        }
    }, [deals, sortBy])

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                    <p className="text-red-500 font-semibold mb-2">
                        LIMITED TIME OFFERS
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Deals & Offers
                    </h1>
                    <p className="text-slate-600 mt-3 max-w-2xl">
                        Get the best prices on selected computers,
                        accessories, and other tech products.
                    </p>
                </div>

                {/* Sorting */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <opttion value="discount">
                        Biggest Discount
                    </opttion>
                    <option value="price-low">
                        Price: Low to High
                    </option>
                    <option value="price-high">
                        Price: High to Low
                    </option>
                    <option value="rating">
                        Highest Rated
                    </option>
                </select>
            </div>

            {/* Deals Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p=6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Don't Miss Out on Our Exclusive Deals!
                        </h2>
                        <p className="text-slate-300 mt-2">
                            Save more while stocks last.
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-sm text-slate-400">
                            Available Deals
                        </p>
                        <p className="text-3xl font-bold">
                            {sortedDeals.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Deal Count */}
            <div className="mb-6">
                <p className="text-slate-600">
                    Showing{" "}
                    <span className="font-semibold">
                        {sortedDeals.length}
                    </span>{" "}
                    deals
                </p>
            </div>

            {/* Products */}
            {sortedDeals.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedDeals.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow p-12 text-center">
                    <h2 className="text-2xl font-bold">
                        No deals available
                    </h2>
                    <p className="text-slate-500 mt-3">
                        Check back later for new offers
                    </p>
                </div>
            )}
        </div>
    )
}

export default Deals