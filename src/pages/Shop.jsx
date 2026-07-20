import { useState } from "react"
import ProductCard from "../components/product/ProductCard"
import { products } from "../data/products"

function Shop() {
    const [search, setSearch] = useState("")

    const [selectedCategory, setSelelctedCategory] = useState("All")

    const [selectedBrands, setSelectedBrands] = useState([])

    const [sortBy, setSortBy] = useState("Newest")

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === "All" || 
            product.category === selectedCategory

        const matchesBrand = 
            selectedBrands.length === 0 || 
            selectedBrands.includes(product.brand)

        return matchesSearch && matchesCategory && matchesBrand
    })
    .sort((a, b) => {
        switch (sortBy) {
            case "LowHigh": return a.price - b.price;
            case "HighLow": return b.price - a.price;
            case "HighestRated": return b.rating - a.rating;
            default: return b.id - a.id
        }
    })

    const categories = [
        "All",
        ...new Set(products.map(product => product.category))
    ]

    const brands = [
        ...new Set(products.map(product => product.brand))
    ].sort();

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) => {
            if (prev.includes(brand)) {
                return prev.filter((b) => b !== brand)
            }
            return [...prev, brand]
        })
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold">
                Shop
            </h1>
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-slate-600">
                    Showing
                    <span className="font-semibold mx-1">
                        {filteredProducts.length}
                    </span>
                    products
                </p>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="Newest">Newest</option>
                    <option value="LowHigh">Price: Low to High</option>
                    <option value="HighLow">Price: High to Low</option>
                    <option value="HighestRated">Highest Rated</option>
                </select>
            </div>
            <hr className="my-6 border-slate-200"/>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-8">

                {/* Sidebar */}
                <aside>
                    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                        <h2 className="text-2xl font-bold mb-8">
                            Filters
                        </h2>

                        <div className="mb-8">
                            <label className="block font-semibold mb-3">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelelctedCategory(category)
                                            setSearch("")
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition ${
                                            selectedCategory === category
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-slate-100"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-semibold mb-4">
                                Brands
                            </h3>
                            <div className="space-y-3">
                                {brands.map((brand) => (
                                    <label
                                        key={brand}
                                        className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="w-4 h-4 accent-blue-600"
                                        />
                                        <span>{brand}</span>
                                        <span className="text-slate-400 text-sm">
                                            ({products.filter(p => p.brand === brand).length})
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={() => {
                                    setSearch("")
                                    setSelelctedCategory("All")
                                    setSelectedBrands([])
                                }}
                                className="w-full border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>                                        
                </aside>

                {/* Products */}
                <section>
                    {filteredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ): (
                        <div className="bg-white rounded-2xl p-12 text-center shadow">
                            <h2 className="text-2xl font-bold">
                                No products found
                            </h2>
                            <p className="txt-slate-500 mt-3">
                                Try changing your search or filters.
                            </p>
                        </div>
                    )}

                </section>
            </div>
        </div>
    )
}

export default Shop