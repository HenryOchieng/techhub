import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { checkoutSchema } from "../validation/checkoutSchema"
import InputField from "../components/checkout/InputField"
import useCartStore from "../store/cartStore"
import useCheckoutStore from "../store/checkoutStore"

function Checkout() {
    const cart = useCartStore(state => state.cart)

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const shipping = subtotal >= 5000 ? 0 : 500

    const tax = 0

    const total = subtotal + shipping + tax

    const shippingDetails = useCheckoutStore(
        (state) => state.shippingDetails
    )

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        shouldFocusError: true,
        mode: "onChange",
        defaultValues: shippingDetails
    })

    const navigate = useNavigate()

    const saveShipping = useCheckoutStore(
        state => state.saveShipping
    )

    const onSubmit = async (data) => {

        await new Promise(resolve =>
            setTimeout(resolve, 1500)
        )

        saveShipping(data)
        
        toast.success("Shipping details saved")
        
        navigate("/payment")
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        Billing Details
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
                                {...register("notes")}
                                placeholder="Apartment number, landmark, gate instructions..."
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-8 py-4 rounded-xl font-semibold transition ${
                            isSubmitting
                                ? "bg-slate-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        {isSubmitting
                            ? "Processing..."
                            : "Continue to Payment"
                        }
                    </button>
                </form>
                <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex gap-4 border-b pb-4 mb-4"
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-lg object-cover border"
                                />
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Qty: {item.quantity}
                                </p>
                                <p className="text-blue-600 font-bold mt-2">
                                    Kshs. {(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="space-y-3 mt-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Kshs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">
                                {shipping === 0
                                    ? "FREE"
                                    : `Kshs. ${shipping.toLocaleString()}`
                                }
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>Kshs. {tax.toLocaleString()}</span>
                        </div>
                        <hr/>
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span className="text-blue-600">
                                Kshs. {total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout