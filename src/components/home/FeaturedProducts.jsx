import { useQuery } from "@tanstack/react-query"
import { getFeaturedProducts } from "../../api/products"
import ProductCard from "../product/ProductCard"

function FeaturedProducts() {
    const { data = [], isLoading } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: getFeaturedProducts,
    })

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Featured Products
                </h2>

                <p className="text-center text-slate-500 mt-4 mb-12">
                    Hand-picked products for professionals and businesses
                </p>

                {isLoading ? (
                    <p className="text-center">Loading products...</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeaturedProducts