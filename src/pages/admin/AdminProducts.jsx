import { useState } from "react"
import {
    FiSearch,
    FiEye,
    FiEdit,
    FiTrash2,
    FiFilter,
    FiPackage,
    FiX
} from "react-icons/fi"

function AdminProducts() {
    const [search, setSearch] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [editingProduct, setEditingProduct] = useState(null)

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "HP EliteBook 840 G8",
            brand: "HP",
            category: "Laptops",
            price: 89000,
            stock: 12,
            status: "In Stock",
            image: null
        },
        {
            id: 2,
            name: "Dell Latitude 7420",
            brand: "Dell",
            category: "Laptops",
            price: 98000,
            stock: 8,
            status: "In Stock",
            image: null
        },
        {
            id: 3,
            name: "Logitech MX Master 3S",
            brand: "Logitech",
            category: "Accessories",
            price: 14500,
            stock: 30,
            status: "In Stock",
            image: null
        },
        {
            id: 4,
            name: "Samsung 27-inch IPS Monitor",
            brand: "Samsung",
            category: "Monitors",
            price: 32000,
            stock: 15,
            status: "In Stock",
            image: null
        }
    ])

    const filteredProducts = products.filter((product) => {
        const matchesSearch = 
            product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            product.brand.toLocaleLowerCase().includes(search.toLocaleLowerCase())

        const matchesCategory =
            categoryFilter === "All" ||
            product.category === categoryFilter

        return matchesSearch && matchesCategory
    })

    const getStockStyle = (stock) => {
        if (stock === 0) {
            return "bg-red-100 text-red-700"
        }

        if (stock <= 5) {
            return "bg-yello-100 text-yellow-700"
        }

        return "bg-green-100 text-green-700"
    }

    return (
        <div className="p-6 lg:p-8">

            {/* Page Header */}
            <div className="mb-8">
                <p className="text-blue-600  font-semibold text-sm">
                    MANAGEMENT
                </p>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">
                    Products
                </h1>
                <p className="text-slate-500 mt-2">
                    Manage products in your store.
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                    {/* Search */}
                    <div className="relative w-full lg:max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search product or brand..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-3">
                        <FiFilter className="text-slate-500" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">
                                All Categories
                            </option>
                            <option value="Laptops">
                                Laptops
                            </option>
                            <option value="Accessories">
                                Accessories
                            </option>
                            <option value="Monitors">
                                Monitors
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Table Header */}
                <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">
                        All Products
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {filteredProducts.length} product found
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-slate-50 transition"
                                >

                                    {/* Product */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-slate-100 flex itemscenter justify-center overflow-hidden">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ): (
                                                    <FiPackage className="text-slate-400 text-xl" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {product.brand}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-5 text-slate-600">
                                        {product.category}
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-5 font-semibold text-slate-900 whitespace-nowrap">
                                        Kshs. {product.price.toLocaleString()}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-6 py-5 text-slate-700">
                                        {product.stock}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockStyle(product.stock)}`}
                                        >
                                            {product.stock === 0
                                                ? "Out of Stock"
                                                : product.stock <= 5
                                                    ? "Low Stock"
                                                    : "In Stock"
                                            }
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                                arial-label={`View ${product.name}`}
                                            >
                                                <FiEye />
                                            </button>
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition"
                                                aria-label={`Edit ${product.name}`}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                                                arial-label={`Delet ${product.name}`}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredProducts.legth === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        No product found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Product */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSelectedProduct(null)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto round-2xl">

                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-b border-slate-200 px-6 py-6 flex items-center justify-between z-10">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Product Details
                                </p>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                                    {selectedProduct.name}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition"
                                aria-label="Close product details"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">

                            {/* Product Image */}
                            <div className="flex justify-center">
                                <div className="w-48 h-48 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                                    {selectedProduct.image ? (
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <FiPackage className="text-slate-400 text-5xl" />
                                    )}
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Product Information
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Product Name
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedProduct.name}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Brand
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedProduct.brand}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Category
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedProduct.category}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Price
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            Kshs. {Number(selectedProduct.price).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-slayte-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Stock
                                        </p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {selectedProduct.stock} units
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Availability
                                        </p>
                                        <span
                                            className={`inline-block mt-1 px-3 rounded-full text-xs font-semibold ${getStockStyle(
                                                selectedProduct.stock
                                            )}`}
                                        >
                                            {selectedProduct.stock === 0
                                                ? "Out of Stock"
                                                : selectedProduct.stock <= 5
                                                    ? "Low Stock"
                                                    : "In Stock"
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setEditingProduct(null)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Product Management
                                </p>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                                    Edit Product
                                </h2>
                            </div>
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition"
                                aria-label="Close edit product"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()

                                setProducts((currentProducts) =>
                                    currentProducts.map((product) =>
                                        product.id === editingProduct.id
                                            ? editingProduct
                                            : product
                                    )
                                )

                                setEditingProduct(null)
                            }}
                            className="p-6 space-y-6"
                        >
                            
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Brand & Category */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.brand}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                brand: e.target.value
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={editingProduct.category}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                category: e.target.value
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focue:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Laptops">Laptops</option>
                                        <option value="Desktop Computers">Desktop Computers</option>
                                        <option value="Storage Devices">Storage Devices</option>
                                        <option value="Networking Equipments">Networking Equipments</option>
                                        <option value="Printers & Scanners">Printers & Scanners</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Monitors">Monitors</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price & Stock */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => 
                                            setEditingProduct({
                                                ...editingProduct,
                                                price: Number(e.target.value)
                                            }) 
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={(e) => 
                                            setEditingProduct({
                                                ...editingProduct,
                                                stock: Number(e.target.value)
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
} 

export default AdminProducts