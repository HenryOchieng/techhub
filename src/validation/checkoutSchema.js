import { z } from "zod"

export const checkoutSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be atleast 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name be atleast 2 characters"),

    email: z
        .string()
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .regex(/^(?:\+254|0)(7\d{8}|1\d{8})$/, "Enter a valid Kenyan phone number"),

    county: z
        .string()
        .min(1, "Please select a county"),

    town: z
        .string()
        .min(2, "Town/City is required"),

    address: z
        .string()
        .min(5, "Please enter your street address"),

    postalCode: z
        .string()
        .optional(),

    notes: z
        .string()
        .optional()

})