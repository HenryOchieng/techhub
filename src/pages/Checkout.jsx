import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkoutSchema } from "../validation/checkoutSchema"
import InputField from "../components/checkout/InputField"
import useCartStore from "../store/cartStore"

function Checkout() {
    const cart = useCartStore(state => state.cart)

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            county: "",
            town: "",
            address: "",
            notes: ""
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        Shipping Form
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField
                                label="First Name"
                                name="firstName"
                                register={register}
                                error={errors.firstName}
                            />
                            <InputField
                                label="Last Name"
                                name="lastName"
                                register={register}
                                error={errors.lastName}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                register={register}
                                error={errors.email}
                            />
                            <InputField
                                label="Phone Number"
                                name="phone"
                                register={register}
                                error={errors.phone}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    County
                                </label>
                                <select
                                    {...register("county")}
                                    className={`w-full rounded-xl px-4 py-3 border ${
                                        errors.county
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select County</option>
                                    <option>Kisumu</option>
                                    <option>Nairobi</option>
                                    <option>Mombasa</option>
                                    <option>Siaya</option>
                                    <option>Nakuru</option>
                                </select>
                                {errors.county && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.county.message}
                                    </p>
                                )}
                            </div>
                            <InputField
                                label="Town/City"
                                name="town"
                                register={register}
                                error={errors.town}
                            />
                            <InputField 
                                label="Address"
                                name="address"
                                register={register}
                                error={errors.address}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="block mb-2 font-medium">
                                Delivery Notes
                            </label>
                            <textarea
                                rows="4"
                                name="notes"
                                register={register}
                                placeholder="Apartment number, landmark, gate instructions..."
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                    >
                        Continue to Payment
                    </button>
                </form>
                <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
                    Order Summary
                </div>
            </div>
        </div>
    )
}

export default Checkout