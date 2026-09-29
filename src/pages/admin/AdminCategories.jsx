import { useState } from "react"
import {
    FiSearch,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiX,
    FiPackage
} from "react-icons/fi"

function AdminCategories() {

    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Laptops",
            description: "Portable computers and notebooks",
            products: 2
        },
        {
            id: 2,
            name: "Desktop Computers",
            description: "Desktop PCs and workstations",
            products: 0
        },
        {
            id: 3,
            name: "Storage Devices",
            description: "Hard drives, SSDs and storage accessories",
            products: 0
        },
        {
            id: 4,
            name: "Networking Equipment",
            description: "Routers, switches and networking accessories",
            products: 0
        },
        {
            id: 5,
            name: "Printers & Scanners",
            description: "Printers, scanners and related accessories",
            products: 0
        },
        {
            id: 6,
            name: "Accessories",
            description: "Computer peripherals and accessories",
            products: 1
        },
        {
            id: 7,
            name: "Monitors",
            description: "Computer monitors and displays",
            products: 1
        }
    ])

    const [search, setSearch] = useState("")
    const [addingCategory, setAddingCategory] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [deletingCategory, setDeletingCategory] = useState(null)

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-5 lg:p-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        Categories
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage your product categories
                    </p>
                </div>

                <button
                    onClick={() => setAddingCategory(true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    <FiPlus />
                    Add Category
                </button>

            </div>

            {/* Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

                <div className="relative max-w-xl">

                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {filteredCategories.map((category) => (

                    <div
                        key={category.id}
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                <FiPackage className="text-xl" />
                            </div>

                            <div className="flex items-center gap-1">

                                <button
                                    onClick={() => setEditingCategory(category)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                                    aria-label="Edit category"
                                >
                                    <FiEdit2 />
                                </button>

                                <button
                                    onClick={() => setDeletingCategory(category)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                                    aria-label="Delete category"
                                >
                                    <FiTrash2 />
                                </button>

                            </div>

                        </div>

                        <div className="mt-5">

                            <h2 className="text-lg font-bold text-slate-900">
                                {category.name}
                            </h2>

                            <p className="text-sm text-slate-500 mt-2 min-h-[40px]">
                                {category.description}
                            </p>

                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">

                            <span className="text-sm text-slate-500">
                                Products
                            </span>

                            <span className="font-bold text-slate-900">
                                {category.products}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl py-12 text-center text-slate-500">
                    No categories found.
                </div>
            )}

            {/* Add Category Modal */}
            {addingCategory && (
                <CategoryFormModal
                    title="Add Category"
                    onClose={() => setAddingCategory(false)}
                    onSubmit={(formData) => {

                        const newCategory = {
                            id: Date.now(),
                            name: formData.get("name"),
                            description: formData.get("description"),
                            products: 0
                        }

                        setCategories((current) => [
                            ...current,
                            newCategory
                        ])

                        setAddingCategory(false)
                    }}
                />
            )}

            {/* Edit Category Modal */}
            {editingCategory && (
                <CategoryFormModal
                    title="Edit Category"
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onSubmit={(formData) => {

                        const updatedCategory = {
                            ...editingCategory,
                            name: formData.get("name"),
                            description: formData.get("description")
                        }

                        setCategories((current) =>
                            current.map((category) =>
                                category.id === editingCategory.id
                                    ? updatedCategory
                                    : category
                            )
                        )

                        setEditingCategory(null)
                    }}
                />
            )}

            {/* Delete Confirmation */}
            {deletingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setDeletingCategory(null)}
                    />

                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                        <div className="flex items-start justify-between">

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Delete Category
                                </h2>

                                <p className="text-sm text-slate-500 mt-2">
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold text-slate-700">
                                        {deletingCategory.name}
                                    </span>
                                    ?
                                </p>
                            </div>

                            <button
                                onClick={() => setDeletingCategory(null)}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                            >
                                <FiX />
                            </button>

                        </div>

                        {deletingCategory.products > 0 && (
                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                                This category currently contains{" "}
                                <strong>
                                    {deletingCategory.products}
                                </strong>{" "}
                                product(s). In the backend, deletion should be
                                blocked or require those products to be moved
                                first.
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setDeletingCategory(null)}
                                className="px-5 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {

                                    setCategories((current) =>
                                        current.filter(
                                            (category) =>
                                                category.id !== deletingCategory.id
                                        )
                                    )

                                    setDeletingCategory(null)
                                }}
                                className="px-5 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
                            >
                                Delete Category
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}


/* Category Form Modal */

function CategoryFormModal({
    title,
    category,
    onClose,
    onSubmit
}) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {title}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            {category
                                ? "Update category information"
                                : "Create a new product category"}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                    >
                        <FiX />
                    </button>

                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(new FormData(e.currentTarget))
                    }}
                    className="p-6"
                >

                    <div className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Category Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                required
                                defaultValue={category?.name || ""}
                                placeholder="e.g. Gaming Laptops"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                rows="4"
                                defaultValue={category?.description || ""}
                                placeholder="Describe this category..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 mt-7">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            {category ? "Save Changes" : "Add Category"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AdminCategories