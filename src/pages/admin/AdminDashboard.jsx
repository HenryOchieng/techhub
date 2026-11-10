import { useEffect, useState } from "react"
import {
    FiDollarSign,
    FiShoppingBag,
    FiUsers,
    FiPackage,
    FiArrowUp,
    FiArrowDown,
    FiClipboard,
} from "react-icons/fi"
import useOrderStore from "../../store/orderStore"
import inventoryService from "../../services/inventoryService"
import productService from "../../services/productService"

function AdminDashboard() {
    const orders = useOrderStore((state) => state.orders)

    const latestOrders = [...orders]
        .sort((a, b) => {
            const dateA = new Date(
                a.orderDate ?? a.createdAt ?? a.date ?? 0
            ).getTime()

            const dateB = new Date(
                b.orderDate ?? b.createdAt ?? b.date ?? 0
            ).getTime()

            return dateB - dateA
        })
        .slice(0, 5)

    const totalOrders = orders.length

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending" 
    ).length

    const completedOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length

    const [inventoryHistory, setInventoryHistory] = useState([])
    const [inventoryLoading, setInventoryLoading] = useState(true)
    const [inventoryError, setInventoryError] = useState("")

    const [inventorySummary, setInventorySummary] = useState({
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
    })

    const [summaryLoading, setSummaryLoading] = useState(true)
    const [summaryError, setSummaryError] = useState("")

    useEffect(() => {
        const fetchInventoryHistory = async () => {
            try {
                setInventoryLoading(true)
                setInventoryError("")

                const response = await inventoryService.getInventoryHistory()

                const records = Array.isArray(response)
                    ? response
                    : response.data ??
                        response.movements ??
                        response.inventoryHistory ??
                        []

                if (!Array.isArray(records)) {
                    throw new Error("Invalid inventory history response")
                }

                const normalizedRecords = records.map((movement) => ({
                    ...movement,
                    type: String(movement.type ?? "").toUpperCase(),
                    productName:
                        movement.product?.name ??
                        movement.productName ??
                        "Unknown product",
                    productId:
                        movement.productId ??
                        movement.product?.id,
                    date: movement.createdAt ?? movement.date,
                }))

                setInventoryHistory(normalizedRecords)
            } catch (error) {
                console.error("Dashboard inventory error:", error)

                setInventoryError(
                    error.response?.data?.message ??
                    error.message ??
                    "Unable to load inventory activity"
                )
            } finally {
                setInventoryLoading(false)
            }
        }

        fetchInventoryHistory()
    }, [])

    useEffect(() => {
        const fetchInventorySummary = async () => {
            try {
                setSummaryLoading(true)
                setSummaryError("")

                const [productsResponse, lowStockResponse, outOfStockResponse] =
                    await Promise.all([
                        productService.getProducts(),
                        inventoryService.getLowStockProducts(),
                        inventoryService.getOutOfStockProducts(),

                    ])

                const extractRecords = (response) => {
                    const candidates = [
                        response,
                        response?.products,
                        response?.data,
                        response?.data?.products,
                        response?.data?.data,
                    ]

                    const records = candidates.find(Array.isArray)

                    if (!records) {
                        throw new Error("Invalid inventory summary response")
                    }

                    return records
                }

                const products = extractRecords(productsResponse)
                const lowStockProducts = extractRecords(lowStockResponse)
                const outOfStockProducts = extractRecords(outOfStockResponse)

                setInventorySummary({
                    totalProducts: products.length,
                    lowStock: lowStockProducts.length,
                    outOfStock: outOfStockProducts.length,
                })
            } catch (error) {
                console.error("Inventory summary error:", error)

                setSummaryError(
                    error.response?.data?.message ??
                    error.message ??
                    "Unable to load inventory summary"
                )
            } finally {
                setSummaryLoading(false)
            }
        }

        fetchInventorySummary()
    }, [])

    const recentInventoryMovements = [...inventoryHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5)

    const totalInventoryMovements = inventoryHistory.length

    const totalRestocks = inventoryHistory.filter(
        (movement) => movement.type === "RESTOCK"
    ).length

    const totalRevenue = orders
        .filter((order) => order.paymentStatus === "Paid")
        .reduce((total, order) => total + Number(order.total || 0), 0)

    const stats = [
        {
            title: "Total Revenue",
            value: `Kshs. ${totalRevenue.toLocaleString()}`,
            icon: FiDollarSign,
            change: `${completedOrders} completed`,
            positive: true
        },
        {
            title: "Total Orders",
            value: totalOrders.toLocaleString(),
            icon: FiShoppingBag,
            change: `${totalOrders} orders`,
            positive: true
        },
        {
            title: "Pending Order",
            value: pendingOrders.toLocaleString(),
            icon: FiUsers,
            change: `${pendingOrders} pending`,
            positive: false
        },
        {
            title: "Completed Orders",
            value: completedOrders.toLocaleString(),
            icon: FiPackage,
            change: `${completedOrders} completed`,
            positive: true
        }
    ]


    return (
        <div className="p-5 lg:p-8">

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="text-slate-500 mt-1">
                    Here's what's happening with your store.
                </p>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {stats.map((stat) => {

                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="bg-white border border-slate-200 rounded-2xl p-6"
                        >

                            <div className="flex items-center justify-between">

                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Icon className="text-xl" />
                                </div>

                                <span
                                    className={`flex items-center gap-1 text-sm font-semibold ${
                                        stat.positive
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stat.positive
                                        ? <FiArrowUp />
                                        : <FiArrowDown />
                                    }

                                    {stat.change}
                                </span>

                            </div>

                            <p className="text-sm text-slate-500 mt-5">
                                {stat.title}
                            </p>

                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {stat.value}
                            </p>

                        </div>
                    )
                })}
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                    Inventory Overview
                </h2>
                {summaryLoading ? (
                    <p className="text-slate-500">Loading inventory summary...</p>
                ) : summaryError ? (
                    <p className="text-red-600">{summaryError}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Total Products
                                </p>
                                <FiPackage className="text-xl text-blue-600" />
                            </div>
                            <p className="text-3xl font-bold text-slate-900 mt-3">
                                {inventorySummary.totalProducts.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                Active products in store
                            </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Low Stock
                                </p>
                                <FiArrowDown className="text-xl text-amber-600" />
                            </div>
                            <p className="text-3xl font-bold text-amber-600 mt-3">
                                {inventorySummary.lowStock.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                Products requiring restocking
                            </p>
                        </div>
                        <div className="bg-white border border-slate-200 runded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Out of Stock
                                </p>
                                <FiPackage className="text-xl text-red-600" />
                            </div>
                            <p className="text-3xl font-bold text-red-600 mt-3">
                                {inventorySummary.outOfStock.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                Products currently unavailable
                            </p>
                        </div>
                    </div>
                )
            }
            </div>

            {/* Recent Orders */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-200">

                    <h2 className="text-lg font-bold text-slate-900">
                        Recent Orders
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Latest orders placed in your store
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Order
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Customer
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Amount
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {latestOrders.map((order) => (
                                <tr
                                    key={order.orderNumber ?? order.id}
                                    className="hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        {order.orderNumber ?? order.id}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {order.customerName ??
                                            order.customer ??
                                            `${order.shippingDetails?.firstName ?? ""} ${order.shippingDetails?.lastName ?? ""}`.trim()
                                        }
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        Kshs. {Number(order.total || 0).toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "Processing"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Inventory Activity */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Inventory History
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Recent changes to your product stock levels
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="rounded-xl bg-blue-50 px-4 py-3">
                            <p className="text-xs text-blue-600">
                                Total Movements
                            </p>
                            <p className="text-xl font-bold text-blue-700">
                                {totalInventoryMovements}
                            </p>
                        </div>
                        <div className="rounded-xl bg-green-50 px-4 py-3">
                            <p className="text-xs text-green-600">
                                Restocks
                            </p>
                            <p className="text-xl font-bold text-green-700">
                                {totalRestocks}
                            </p>
                        </div>
                    </div>
                </div>
                {inventoryLoading ? (
                    <div className="px-6 py-12 text-center">
                        Loading inventory activity...
                    </div>
                ) : inventoryError ? (
                    <div className="px-6 py-12 text-center text-red-600">
                        {inventoryError}
                    </div>
                ) : recentInventoryMovements.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <FiClipboard className="mx-auto text-3xl text-slate-300" />
                        <p className="mt-3 font-semibold text-slate-700">
                            No inventory activity yet
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Activity
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Stock Change
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentInventoryMovements.map((movement) => (
                                    <tr
                                        key={movement.id}
                                        className="hover:bg-slate-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">
                                                {movement.productName}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Product ID: {movement.productId}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                movement.type === "RESTOCK"
                                                    ? "bg-green-100 text-green-700"
                                                    : movement.type === "SALE"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : movement.type === "RETURN"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : movement.type === "ADJUSTMENT"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-slate-100 text-slate-700"
                                            }`}
                                            >
                                                {{
                                                    RESTOCK: "Restock",
                                                    SALE: "Sale",
                                                    RETURN: "Order Cancellation",
                                                    ADJUSTMENT: "Adjustment"
                                                }[movement.type] ?? movement.type}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 font-semibold ${
                                            movement.type === "SALE" || (movement.type === "ADJUSTMENT" && Number(movement.stockAfter) < Number(movement.stockBefore))
                                                ? "text-red-700"
                                                : "text-green-700"
                                        }`}>
                                            {movement.type === "SALE" || (movement.type === "ADJUSTMENT" && Number(movement.stockAfter) < Number(movement.stockBefore)) ? "-" : "+"}
                                            {Math.abs(movement.quantity)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {movement.stockBefore} -{">"} {movement.stockAfter}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                            {movement.date
                                                ? new Date(movement.date).toLocaleDateString()
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            </div>

        </div>
    )
}

export default AdminDashboard