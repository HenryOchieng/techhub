import { motion } from "framer-motion"
import { FiCheckCircle } from "react-icons/fi"

function PaymentCard({
    title,
    description,
    icon,
    value,
    selected,
    onSelect,
    recommended = false
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(value)}
            className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-400"
            }`}
        >
            {recommended && (
                <span className="absolute right-5 top-5 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                </span>
            )}

            <div className="flex items-center gap-5">
                <div className="text-4xl">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">
                        {title}
                    </h3>
                    <p className="text-slate-500 mt-1">
                        {description}
                    </p>
                </div>
                {selected && (
                    <FiCheckCircle
                        size={28}
                        className="text-blue-600"
                    />
                )}
            </div>
        </motion.div>
    )
}

export default PaymentCard