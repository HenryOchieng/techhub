import { useState } from "react"
import InputField from "../components/checkout/InputField"
import useCartStore from "../store/cartStore"

function Checkout() {
    const cart = useCartStore(state => state.cart)

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const [shipping, setShipping] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        county: "",
        town: "",
        address: "",
        postalCode: "",
        notes: ""
    })

    const handleChange = (e) => {
        setShipping({
            ...shipping,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
                <div>
                    Shipping Form
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField
                            label="First Name"
                            name="firstName"
                            value={shipping.firstName}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            value={shipping.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={shipping.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Phone Number"
                            name="phone"
                            placeholder="07xxxxxxxx"
                            value={shipping.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block mb-2 font-medium">
                                County
                            </label>
                            <select
                                name="county"
                                value={shipping.county}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-4 py-3"
                            >
                                <option value="">Select County</option>
                                <option>Kisumu</option>
                                <option>Nairobi</option>
                                <option>Mombasa</option>
                                <option>Siaya</option>
                                <option>Nakuru</option>
                            </select>
                        </div>
                        <InputField
                            label="Town/City"
                            name="town"
                            value={shipping.town}
                            onChange={handleChange}
                        />
                        <InputField 
                            label="Address"
                            name="address"
                            value={shipping.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <label className="block mb-2 font-medium">
                            Delivery Notes
                        </label>
                        <textarea
                            rows="4"
                            name="notes"
                            value={shipping.notes}
                            onChange={handleChange}
                            placeholder="Apartment number, landmark, gate instructions..."
                            className="w-full border rounded-xl px-4 py-3"
                        />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
                    Order Summary
                </div>
            </div>
        </div>
    )
}

export default Checkout