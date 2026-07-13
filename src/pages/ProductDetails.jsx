import { useParams } from "react-router-dom"
import { products } from "../data/products"

function ProductDetails() {
    const { id } = useParams()

    const product = products.find(
        (item) => item.id === Number(id)
    )

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
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded=2xl border"
                    />
                </div>

                {/* Right Side */}
                <div>
                    <p className="text-sm text-slate-500">
                        {product.brand}
                    </p>
                    <h1 className="text-4xl font-bold mt-2">
                        {product.name}
                    </h1>
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
                    {product.badge && (
                        <span className="inline-block mt-4 bg-red-600 text-white px-3 py-1 rounded-full">
                            {product.badge}
                        </span>
                    )}
                    <p className="mt-6 text-slate-600">
                        Premium quality computer designed for
                        performance, reliability and productivity.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails