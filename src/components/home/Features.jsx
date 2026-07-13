import { features } from "../../data/features"
import { motion } from "framer-motion"

function Features() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Why Shop With Us
                    </h2>
                    <p className="text-slate-500 mt-3">
                        Everything you need for your technology journey.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02
                                }}
                                transition={{
                                    duration: .25
                                }}
                                className="bg-slate-50 rounded-2xl shadow-sm p-8 text-center hover:shadow-xl transition-all"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
                                    <Icon className="text-white text-3xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600">
                                    {feature.description}
                                </p>

                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features