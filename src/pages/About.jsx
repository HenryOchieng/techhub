import { FiShield, FiTruck, FiHeadphones, FiAward } from "react-icons/fi"

function About() {
    const features = [
        {
            icon: FiShield,
            title: "Quality Products",
            description: "We offer carefully curated products from top brands, ensuring you receive only the best."
        },
        {
            icon: FiTruck,
            title: "Fast & Reliable Shipping",
            description: "We provide fast and reliable shipping options to ensure your products reach you on time."
        },
        {
            icon: FiHeadphones,
            title: "Customer Support",
            description: "Our dedicated support team is here to assist you with any questions or concerns you may have."
        },
        {
            icon: FiAward,
            title: "Trusted Service",
            description: "We have built a reputation for providing excellent service and support to our customers."
        }
    ]

    return (
        <div className="bg-slate-50">

            {/* Hero */}
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-blue-400 font-semibold mb-3">
                        ABOUT TECHHUB
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Technology Solutions for Your Needs
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto mt-5 text-lg">
                        At TechHub, we are passionate about providing high-quality technology products and solutions to meet your needs. 
                        Our mission is to make technology accessible and enjoyable for everyone.
                    </p>
                </div>
            </section>

            {/* About */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-blue-600 font-semibold mb-3">
                                OUR STORY
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                Empowering Your Digital Life
                            </h2>
                            <p className="text-slate-600 mt-5 leading-relaxed">
                                TechHub is an online technology store focused
                                on providing quality computers, peripherals,
                                networking equipment, and other technology
                                products.
                            </p>
                            <p className="text-slate-600 mt-4 leading-relaxed">
                                Whether you are looking for a laptop for work,
                                a monitor for your office, or accessories for
                                your everyday setup, our goal is to make the
                                shopping experience simple and convenient.
                            </p>
                            <p className="text-slate-600 mt-4 leading-relaxed">
                                We believe customers should have accesss to
                                reliable technology without having to deal
                                with a complicated purchasing process.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-slate-900">
                                Our Mission
                            </h3>
                            <p className="text-slate-600 mt-4 leading-relaxed">
                                To provide reliable technology products and
                                an excellent shoping experience while making
                                technologt accessible to individuals,
                                professionals, and businesses.
                            </p>
                            <div className="border-t border-slate-200 mt-8 pt-8">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    Our Vision
                                </h3>
                                <p className="txt-slate-600 mt-4 leading-relaxed">
                                    To become a trusted destination for
                                    technology products and solutions,
                                    recognized for quality, convenience,
                                    and customer service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold mb-3">
                            WHY CHOOSE US
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Why Shop With TechHub?
                        </h2>
                        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                            We focus on providing quality products and a
                            dependable shopping experience from browsing
                            to delivery.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={feature.title}
                                    className="bg-slate-50 rounded-2xl p-7 text-center hover:shadow-lg transition"
                                >
                                    <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Icon className="text-2xl"/>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mt-5">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 mt-3 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to Upgrade Your Tech?
                    </h2>
                    <p className="text-blue-100 mt-4">
                        Explore our collection of computers, accessories,
                        and other technology products.
                    </p>
                    <a
                        href="/shop"
                        className="inline-block mt-7 bg-white text-blue-600 font-semibold px-7 py-3 rounded-xl hover:bg-slate-100 transition"
                    >
                        Shop Now
                    </a>
                </div>
            </section>
        </div>
    )
}

export default About