import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
//import { Link } from "react-router-dom"
import { getCategories } from "../api/categories"
import { FiArrowRight } from "react-icons/fi"

function Categories() {
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    })

    if (isLoading) {
        return (
            <section className="py-20 bg-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    Loading Categories...
                </div>
            </section>
        )
    }

    const handleCategoryClick = (categoryName) => {
        navigate(`/shop?category=${encodeURIComponent(categoryName)}`)
    }

    return (
        <section className="py-20 bg-slate-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-blue-600 font-semibold uppercase tracking-wider mb-3">
                        Browse Our Store
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                        Shop by Category
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Explore our range of computers, accessories and
                        techology products.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((category) => {
                        const Icon = category.icon
                        return (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.name)}
                                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <Icon
                                        size={32}
                                        className="text-blue-600 group-hover:text-white transition-colors duration-300"
                                    />
                                </div>

                                {/* Category Information */}
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {category.name}
                                </h3>
                                <p className="text-slate-500 mt-2">
                                    {category.totalProducts} Products
                                </p>

                                {/* Shop Button */}
                                <div className="flex items-center gap-2 mt-6 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                                    <span>Shop Now</span>
                                    <FiArrowRight/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Categories