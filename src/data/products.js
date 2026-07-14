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
        images: [],
        badge: "Sale",
        stock: 12,
        sku: "HP840G8",
        description: "The HP EliteBook 840 G8 is a premium business laptop designed for professionals seeking exceptional performance, security, and portability.",
        specifications: {
            processor: "Intel Core i5 11th Gen",
            ram: "16GB DDR4",
            storage: "512GB SSD",
            graphics: "Intel Iris Xe",
            display: '14" FHD IPS',
            operatingSystem: "Windows 11 Pro",
            warranty: "1 Year"
        }
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
        images: [],
        badge: "New",
        stock: 8,
        sku: "DELL7420",
        description: "A premium 14-inch business laptop designed for performance, portability, and productivity.",
        specification: {
            processor: "11th Gen Intel® Core™ i5 or Core™ i7",
            ram: "32GB DDR4",
            storage: "1TB NVMe SSD",
            graphics: "Intel® Iris Xe Graphics",
            display: "14-inch Full HD (1920 × 1080) Anti-Glare",
            operatingSystem: "Windows 11 Pro",
            warranty: "1 Year"
        }
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
        images: [],
        badge: "Sale",
        stock: 30,
        sku: "LogitechMX3S",
        description: "A premium ergonomic wireless mouse with ultra-fast MagSpeed scrolling, quiet clicks, an 8,000 DPI sensor, and multi-device connectivity.",
        specifications: {

        }
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