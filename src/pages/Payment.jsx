import useCheckoutStore from "../store/checkoutStore"
import useCartStore from "../store/cartStore"
import PaymentCard from "../components/checkout/PaymentCard"
import {
    FiSmartphone,
    FiCreditCard,
    FiDollarSign,
    FiShield
} from "react-icons/fi"

function Payment() {
    const shippingDetails = useCheckoutStore(
        state => state.shippingDetails
    )

    const cart = useCartStore(
        state => state.cart
    )

    const paymentMethod = useCheckoutStore(
        state => state.paymentMethod
    )

    const setPaymentMethod = useCheckoutStore(
        state => state.setPaymentMethod
    )

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const shipping = subtotal >= 5000 ? 0 : 500

    const total = subtotal + shipping

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10">
                Payment
            </h1>
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

                {/* Payment Options */}
                <div className="space-y-5">
                    <PaymentCard
                        title="M-Pesa"
                        description="Pay securely using Safaricom M-Pesa"
                        value="M-Pesa"
                        icon={<FiSmartphone className="text-green-600" />}
                        selected={paymentMethod === "M-Pesa"}
                        onSelect={setPaymentMethod}
                        recommended
                    />
                    <PaymentCard
                        title="Credit/Debit Card"
                        description="Pay with Visa, Mastercard"
                        value="Credit/Debit Card"
                        icon={<FiCreditCard className="text-blue-600" />}
                        selected={paymentMethod === "Credit/Debit Card"}
                        onSelect={setPaymentMethod}
                    />
                    <PaymentCard
                        title="Cash on Delivery"
                        description="Pay when your order arrives"
                        value="Cash On Delivery"
                        icon={<FiDollarSign className="text-orange-500" />}
                        selected={paymentMethod === "Cash On Delivery"}
                        onSelect={setPaymentMethod}
                    />
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                        <div className="flex gap-4">
                            <FiShield className="text-green-600 mt-1" size={28}/>
                            <div>
                                <h3 className="font-semibold text-green-700">
                                    Secure Checkout
                                </h3>
                                <p className="text-sm text-green-600">
                                    All transactions are encrypted using industry-standard
                                    security. Your payment details remain safe and private.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!paymentMethod}
                        className={`w-full py-4 rounded-xl font-semibold transition ${
                            paymentMethod
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-slate-300 cursor-not-allowed"
                        }`}
                    >
                        Place Order
                    </button>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-5">
                            Deliver To
                        </h2>
                        <p className="font-semibold">
                            {shippingDetails.firstName} {shippingDetails.lastName}
                        </p>
                        <p>{shippingDetails.phone}</p>
                        <p>{shippingDetails.email}</p>
                        <p className="mt-4">{shippingDetails.address}</p>
                        <p>{shippingDetails.town}</p>
                        <p>{shippingDetails.county}</p>
                    </div>
                    <hr className="my-6"/>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Kshs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "FREE" : `Kshs. ${shipping}`}</span>
                        </div>
                        <hr />
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

export default Payment