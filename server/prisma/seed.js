import prisma from "../src/config/db.js"

const products = [
    {
        name: "HP Elitebook 840 G8",
        slug: "hp-elitebook-840-g8",
        sku: "HP-ELITEBOOK-840-G8",
        brand: "HP",
        categorySlug: "laptops",
        description: "The HP Elitebook 840 G8 is a premium business laptop designed for professionals seeking exce[tional performance, security, and portability.",
        price: 89000,
        oldPrice: 95000,
        rating: 4.8,
        stock: 12,
        lowStockLevel: 5,
        specifications: {
            processor: "Intel Core i5 11th Gen",
            ram: "16GB DDR4",
            storage: "512GB SSD",
            graphics: "Intel Iris Xe",
            display: '14" FHD IPS',
            os: "Windows 11 Pro",
            warranty: "1 Year"
        },
        reviews: [
            {
                name: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                name: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ]
    },
    {
        name: "Dell Latitude 7420",
        slug: "dell-latitude-7420",
        sku: "DELL-LATITUDE-7420",
        brand: "Dell",
        categorySlug: "laptops",
        description: "A premium 14-inch business laptop designed for professionals seeking performance, security, and portability.",
        price: 98000,
        oldPrice: null,
        rating: 4.5,
        stock: 8,
        lowStockLevel: 5,
        specifications: {
            processor: "11th Gen Intel Core i5 or Core i7",
            ram: "32GB DDR4",
            storage: "1TB NVMe SSD",
            graphics: "Intel Iris Xe Graphics",
            display: "14-Iinch Full HD (1920 x 1080) Anti-Glare",
            os: "Windows 11 Pro",
            warranty: "1 Year"
        },
        reviews: [
            {
                name: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                name: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ]
    },
    {
        name: "Apple MacBook Pro 16-inch",
        slug: "apple-macbook-pro-16-inch",
        sku: "APPLE-MACBOOK-PRO-16",
        brand: "Apple",
        categorySlug: "laptops",
        description: "The Apple MacBook Pro 16-inch is a high-performance laptop designed for professionals and creatives who demand power, speed, and a stunning Retina display.",
        price: 250000,
        oldPrice: 270000,
        rating: 4.9,
        stock: 5,
        lowStockLevel: 5,
        badge: "Sale",
        specifications: {
            processor: "Apple M1 Pro or M1 Max",
            ram: "16GB or 32GB Unified Memory",
            storage: "512GB, 1TB, or 2TB SSD",
            graphics: "Integrated 16-core or 32-core GPU",
            display: '16.2-inch Liquid Retina XDR',
            os: "macOS",
            warranty: "1 Year"
        },
        reviews: [
            {
                name: "Steve",
                rating: 5,
                comment: "Excellent laptop. Fast and lightweight"
            },
            {
                name: "Jane",
                rating: 4,
                comment: "Battery life is amazing"
            }
        ] 
    },
    {
        name: "Logitech MX Master 3S",
        slug: "logietech-mx-master-3s",
        sku: "LogitechMX3S",
        brand: "Logitech",
        categorySlug: "accessories",
        description: "A premium ergonomic wireless mouse with ultra-fast MagSpeed scrolling, quiet clicks, an 8,000 DPI sensor, and multi-device connectivity.",
        price: 14500,
        oldPrice: 17000,
        rating: 4.7,
        stock: 30,
        lowStockLevel: 5,
        badge: "Sale",
        specifications: {
            sensor: "Darfield hugh-precision sensor",
            wirelessRange: "Up to 10 meters",
            batttery: "Built-in 500 mAh rechargeable Li-Po battery",
            batteryLife: "Up to 70 days on a full charge",
            chargingPort: "USB-C",
            weight: "141g",
            dimensions: "124.9 x 84.3 x 51 mm"
        },
        reviews: [
            {
                name: "Steve",
                rating: 5,
                comment: "Superb and excellent mouse."
            },
            {
                name: "Jane",
                rating: 4.5,
                comment: "This is one of a kind mouse, the scrolling smoothness is second to none."
            }
        ]
    },
    {
        name: "Samsung 27-Inch IPS Monitor",
        slug: "samsung-27-inch-ips-monitor",
        sku: "SAMSUNG-27-IPS-MONITOR",
        brand: "Samsung",
        categorySlug: "desktop-computers",
        description: "The Samsung 27-inch IPS Monitor features a 27-inch Full HD (1920 × 1080) IPS display that provides vibrant colors and consistent image quality from virtually any viewing angle (up to 178° horizontally and vertically).",
        price: 32000,
        oldPrice: null,
        rating: 4.7,
        stock: 15,
        lowStockLevel: 5,
        specifications: {
            screenSize: "27 inches",
            panelType: "IPS (In-Plane Switching)",
            resolution: "Full HD (192 X 1080)",
            aspectRatio: "16:9",
            refreshRate: "Up to 75 Hz",
            ports: "HDMI, VGA (model-dependent)",
            adaptiveSync: "AMD FreeSync (selected models)"
        },
        reviews: [
            {
                name: "Steve",
                rating: 5,
                comment: "Excellent Monitor Screen."
            },
            {
                name: "Jane",
                rating: 4,
                comment: "Perfect Display Resolution"
            }
        ]
    }
]

async function seedProducts() {
    for (const product of products) {
        const category = await prisma.category.findUnique({
            where: { slug: product.categorySlug}
        })

        if (!category) {
            throw new Error(`Category not found: ${product.categorySlug}. Create it before seeding products.`)
        }

        const {  ...productData } = product

        const savedProduct = await prisma.product.upsert({
            where: { slug: product.slug},
            update: {
                ...productData,
                categoryId: category.id
            },
            create: {
                ...productData,
                categoryId: category.id
            }
        })
        console.log(`Saved: ${savedProduct.name}`)
    }
    console.log("Product seeding completed successfully!")
}

seedProducts().catch((error) => {
    console.error("Product seeding failed:", error)
    globalThis.process.exitCode = 1
})
.finally(async () => {
    await prisma.$disconnect()
})