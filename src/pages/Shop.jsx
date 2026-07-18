import { useState } from "react"
import ProductCard from "../components/product/ProductCard"
import { products } from "../data/products"

function Shop() {
    const [search, setSearch] = useState("")

    const [selectedCategory, setSelelctedCtegory] = useState("All")

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === "All" || 
            product.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const categories = [
        "All",
        ...new Set(products.map(product => product.category))
    ]


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-10">
                Shop
            </h1>
            <div className="grid lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">
                            Filters
                        </h2>
                    </div>
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
                                                    
                    <div className="mb-8">
                        <h3 className="font-semibold mb-4">
                            Categories
                        </h3>
                        <div className="space-y-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelelctedCtegory(category)
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
                </aside>
               


                {/* Products */}
                <main className="lg:col-span-3">
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

                </main>
            </div>
        </div>
    )
}

export default Shop