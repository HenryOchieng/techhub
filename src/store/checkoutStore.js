import { create } from "zustand"
import { persist }  from "zustand/middleware"

const useCheckoutStore = create(
    persist(
        (set) => ({
            shippingDetails: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                county: "",
                town: "",
                address: "",
                postalCode: "",
                notes: ""
            },

            paymentMethod: "",

            saveShipping: (details) =>
                set({
                    shippingDetails: details
                }),

            setPaymentMethod: (method) =>
                set({
                    paymentMethod: method
                }),

            clearCheckout: () =>
                set({
                    shippingDetails: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        county: "",
                        town: "",
                        address: "",
                        postalCode: "",
                        notes: ""
                    },
                    paymentMethod: ""
                })
        }),
        {
            name: "checkout-storage"
        }
    )
)

export default useCheckoutStore