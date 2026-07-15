import eliteBook from "../assets/products/hp/elitebook.jpg"
import eliteBookBack from "../assets/products/hp/elitebook-back.jpg"
import eliteBookSide from "../assets/products/hp/elitebook-side.jpg"
import eliteBookOpen from "../assets/products/hp/elitebook-open.jpg"
import dellLatitude from "../assets/products/dell/Dell.jpg"
import dellLat1 from "../assets/products/dell/Dell-open.jpg"
import dellLat2 from "../assets/products/dell/Dell-side.jpg"
import dellLat3 from "../assets/products/dell/Dell-back.jpg"
import logitechMX from "../assets/products/logitech/Logitech.jpg"
import logiTech1 from "../assets/products/logitech/Logitech-back.jpg"
import logiTech2 from "../assets/products/logitech/Logitech-front.jpg"
import logiTech3 from "../assets/products/logitech/Logitech-side.jpg"
import samsungMonitor from "../assets/products/monitor/Samsung.jpg"
import samMonitor1 from "../assets/products/monitor/Samsung-back.jpg"
import samMonitor2 from "../assets/products/monitor/Samsung-front.jpg"
import samMonitor3 from "../assets/products/monitor/Samsung-side.jpg"

export const products = [
    {
        id: 1,
        name: "HP EliteBook 840 G8",
        brand: "HP",
        category: "Laptops",
        price: 89000,
        oldPrice: 95000,
        rating: 4.8,
        reviews: [
            {
                id: 1,
                user: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                id: 2,
                user: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ],
        image: eliteBook,
        images: [eliteBook, eliteBookBack, eliteBookSide, eliteBookOpen],
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
            os: "Windows 11 Pro",
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
        reviews: [
            {
                id: 1,
                user: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                id: 2,
                user: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ],
        image: dellLatitude,
        images: [dellLatitude, dellLat1, dellLat2, dellLat3],
        badge: "New",
        stock: 8,
        sku: "DELL7420",
        description: "A premium 14-inch business laptop designed for performance, portability, and productivity.",
        specifications: {
            processor: "11th Gen Intel® Core™ i5 or Core™ i7",
            ram: "32GB DDR4",
            storage: "1TB NVMe SSD",
            graphics: "Intel® Iris Xe Graphics",
            display: "14-inch Full HD (1920 × 1080) Anti-Glare",
            os: "Windows 11 Pro",
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
        reviews: [
            {
                id: 1,
                user: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                id: 2,
                user: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ],
        image: logitechMX,
        images: [logitechMX, logiTech1, logiTech2, logiTech3],
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
        reviews: [
            {
                id: 1,
                user: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                id: 2,
                user: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ],
        image: samsungMonitor,
        images: [samsungMonitor, samMonitor1, samMonitor2, samMonitor3],
        badge: "",
        stock: 15
    }
]