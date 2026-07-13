import {useQuery } from "@tanstack/react-query"
import { getCategories } from "../../api/categories"

function Categories() {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    })

    if (isLoading) {
        return (
            <div className="text-center py-20">
                Loading Categories...
            </div>
        )
    }

    return (
        <section className="py-20 bg-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-14">
                    Shop by Category
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map(category => {
                        const Icon = category.icon
                        return (
                            <div
                                key={category.id}
                                className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition cursor-pointer"
                            >
                                <Icon className="text-blue-600 text-5xl mb-6"/>
                                <h3 className="text-2xl font-semibold">
                                    {category.name}
                                </h3>
                                <p className="text-slate-500 mt-2">
                                    {category.totalProducts} Products
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Categories