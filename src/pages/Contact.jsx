import { useState } from "react"
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi"
import toast from "react-hot-toast" 

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success("Message sent successfullt!")
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        })
    }

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Hero */}
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-blue-400 font-semibold mb-3">
                        GET IN TOUCH
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Contact Us
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto mt-5 text-lg">
                        Have a question about a product, your order, or
                        anything else? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <p className="text-blue-600 font-semibold mb-3">
                                CONTACT INFORMATION
                            </p>
                            <h2 className="text-3xl font-bold text-slate-900">
                                We're Here to Help
                            </h2>
                            <p className="text-slate-600 mt-4 leading-relaxed">
                                Reach out to us through any of the channels
                                below and our team will get back to you as
                                soon as possible.
                            </p>
                            <div className="space-y-6 mt-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <FiPhone className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Phone
                                        </h3>
                                        <p className="text-slate-600 mt-1">
                                            +254 790 238 118
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <FiMail className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Email
                                        </h3>
                                        <p className="text-slate-600 mt-1">
                                            support@techhub.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <FiMapPin className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Location
                                        </h3>
                                        <p className="text-slate-600 mt-1">
                                            Kenya
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <FiClock className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Business Hours
                                        </h3>
                                        <p className="text-slate-600 mt-1">
                                            Monday - Saturday
                                        </p>
                                        <p className="text-slate-600">
                                            8:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Send Us a Message
                            </h2>
                            <p className="text-slate-600 mt-2">
                                Fill in the form below and we'll get back to
                                you.
                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                        className="w-full border border-slate-300 rounder-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write youe message..."
                                        rows="6"
                                        required
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition"
                                >
                                    <FiSend/>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ-style CTA */}
            <section className="bg-white py-16 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Need Help With an Order?
                    </h2>
                    <p className="text-slate-600 mt-4">
                        If you have already placed an order, please have your
                        order details ready when contacting our support team.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Contact