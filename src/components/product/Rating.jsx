import { FiStar } from "react-icons/fi"

function Rating({
    rating,
    reviews,
    showReviews = true,
    size = 18
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    <FiStar
                        key={index}
                        size={size}
                        className={
                            index < Math.round(rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300"
                        }
                    />
                ))}
            </div>
            {showReviews  && (
                <span className="text-slate-500">
                    ({reviews} Reviews)
                </span>
            )}
        </div>
    )
}

export default Rating