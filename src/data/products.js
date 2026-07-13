import eliteBook from "../assets/products/elitebook.jpg"
import dellLatitude from "../assets/products/Dell.jpg"
import logitechMX from "../assets/products/Logitech.jpg"
import samsungMonitor from "../assets/products/Samsung.jpg"

export const products = [
    {
        id: 1,
        name: "HP EliteBook 840 G8",
        brand: "HP",
        category: "Laptops",
        price: 89000,
        oldPrice: 95000,
        rating: 4.8,
        reviews: 36,
        image: eliteBook,
        badge: "Sale",
        stock: 12
    },

    {
        id: 2,
        name: "Dell Latitude 7420",
        brand: "Dell",
        category: "Laptops",
        price: 98000,
        oldPrice: null,
        rating: 4.5,
        reviews: 21,
        image: dellLatitude,
        badge: "New",
        stock: 8
    },

    {
        id: 3,
        name: "Logitech MX Master 3S",
        brand: "Logitech",
        category: "Accessories & Peripherals",
        price: 14500,
        oldPrice: 17000,
        rating: 4.9,
        reviews: 52,
        image: logitechMX,
        badge: "Sale",
        stock: 30
    },

    {
        id: 4,
        name: "Samsung 27-inch IPS Monitor",
        brand: "Samsung",
        category: "Monitors",
        price: 32000,
        oldPrice: null,
        rating: 4.7,
        reviews: 19,
        image: samsungMonitor,
        badge: "",
        stock: 15
    }
]