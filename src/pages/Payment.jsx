import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useOrderStore from "../store/orderStore"
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
    const clearCart = useCartStore(
        (state) => state.clearCart
    )

    const clearCheckout = useCheckoutStore(
        (state) => state.clearCheckout
    )

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

    const [mpesaNumber, setMpesaNumber] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")

    const navigate = useNavigate()

    const createOrder = useOrderStore(
        (state) => state.createOrder
    )

    const [isProcessing, setIsProcessing] = useState(false)

    const handlePlaceOrder = async () => {
        if (!paymentMethod) return 

        setIsProcessing(true)

        await new Promise((resolve) => 
            setTimeout(resolve, 1500)
        )

        const orderNumber = 
            `ORD-${new Date().getFullYear()}-${Date.now()
                .toString()
                .slice(-6)
            }`

        const order = {
            orderNumber,
            items: cart,
            shippingDetails,
            paymentMethod,
            subtotal,
            shipping,
            total,
            status: "Pending",
            orderDate: new Date().toISOString()
        }

        createOrder(order)

        clearCart()
        clearCheckout()

        setIsProcessing(false)

        navigate("/order-success")
    }

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
                    {paymentMethod === "M-Pesa" && (
                        <div className="mt-6 border rounded-2xl p-6 bg-green-50">
                            <h3 className="text-xl font-semibold mb-3 text-green-700">
                                Pay via M-Pesa
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Enter your M-Pesa number. You will receive an STK Push
                                notification on your phone to complete the payment.
                            </p>
                            <label className="block mb-2 font-medium">
                                M-Pesa Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="07xxxxxxxx"
                                value={mpesaNumber}
                                onChange={(e) => setMpesaNumber(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                disabled={!mpesaNumber}
                                className={`mt-5 w-full py-3 rounded-xl font-semibold text-white transition ${
                                    mpesaNumber ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Send STK Push
                            </button>
                        </div>
                    )}

                    <PaymentCard
                        title="Credit/Debit Card"
                        description="Pay with Visa, Mastercard"
                        value="Credit/Debit Card"
                        icon={<FiCreditCard className="text-blue-600" />}
                        selected={paymentMethod === "Credit/Debit Card"}
                        onSelect={setPaymentMethod}
                    />
                    {paymentMethod === "Credit/Debit Card" && (
                        <div className="mt-6 border rounded-2xl p-6 bg-blue-50">
                            <h3 className="text-xl font-semibold mb-4 text-blue-700">
                                Card Payment
                            </h3>
                            <div className="space-7-4">
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        className="w-full border rounded-xl px-4 py-3"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Expriry Date
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="w-full border rounded-xl px-4 py-3" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">
                                            CVV
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="123"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className="w-full border rounded-xl px-4 py-3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <PaymentCard
                        title="Cash on Delivery"
                        description="Pay when your order arrives"
                        value="Cash On Delivery"
                        icon={<FiDollarSign className="text-orange-500" />}
                        selected={paymentMethod === "Cash On Delivery"}
                        onSelect={setPaymentMethod}
                    />
                    {paymentMethod === "Cash On Delivery" && (
                        <div className="mt-6 border rounded-2xl p-6 bg-yellow-50">
                            <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                                Cash on Delivery
                            </h3>
                            <p className="text-gray-700">
                                You will pay in cash when your oder is delivered.
                            </p>
                        </div>
                    )}

                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                        <div className="flex gap-4">
                            <FiShield className="text-green-600 mt-1" size={28}/>
                            <div>
                                <h3 className="font-semibold text-green-700">
                                    Secure Checkout
                                </h3>
                                <p className="text-sm text-green-600">
                                    Payments are processed securely.
                                    For M-Pesa, you'll receive an STK Push on your registered phone number.
                                    Your PIN is entered only in the official M-Pesa prompt and is never stored by TechHub.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={!paymentMethod || isProcessing}
                        className={`w-full mt-8 py-4 rounded-xl font-semibold transition ${
                            !paymentMethod || isProcessing
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-slate-300 text-slate-500 cursor-not-allowed"  
                        }`}
                    >
                        {isProcessing 
                            ? "Processing Order..."
                            : `Place Order - Kshs. ${total.toLocaleString()}`
                        }
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
                        <p>
                            {shippingDetails.town}, {shippingDetails.county}
                        </p>

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