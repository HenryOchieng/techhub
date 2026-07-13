import {
    FiMonitor,
    FiCpu,
    FiHardDrive,
    FiWifi,
    FiPrinter,
    FiHeadphones
} from "react-icons/fi"

export const categories = [
    {
        id: 1,
        name: "Laptops",
        icon: FiMonitor,
        totalProducts: 48
    },

    {
        id: 2,
        name: "Desktop Computers",
        icon: FiCpu,
        totalProducts: 26
    },

    {
        id: 3,
        name: "Storage Devices",
        icon: FiHardDrive,
        totalProducts: 34,
    },

    {
        id: 4,
        name: "Networking Equipment",
        icon: FiWifi,
        totalProducts: 18
    },

    {
        id: 5,
        name: "Printers & Scanners",
        icon: FiPrinter,
        totalProducts: 15
    },

    {
        id: 6,
        name: "Accessories & Peripherals",
        icon: FiHeadphones,
        totalProducts: 72
    }
]