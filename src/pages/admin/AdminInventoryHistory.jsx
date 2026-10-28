
import { useMemo, useState } from "react"
import {
    FiSearch,
    FiPackage,
    FiRefreshCw,
    FiClipboard,
} from "react-icons/fi"
import useProductStore from "../../store/productStore"

function AdminInventoryHistory() {
    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState("All")

    const inventoryHistory = useProductStore(
        (state) => state.inventoryHistory ?? []
    )

    const filteredHistory = useMemo(() => {
        const searchTerm = search.toLowerCase().trim()

        return inventoryHistory.filter((movement) => {
            const matchesSearch =
                (movement.productName ?? "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (movement.supplier ?? "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (movement.reference ?? "")
                    .toLowerCase()
                    .includes(searchTerm)

            const matchesType =
                typeFilter === "All" ||
                movement.type === typeFilter

            return matchesSearch && matchesType
        })
    }, [inventoryHistory, search, typeFilter])

    const totalMovements = inventoryHistory.length

    const restockMovements = inventoryHistory.filter(
        (movement) => movement.type === "Restock"
    ).length

    const formatDate = (date) => {
        if (!date) return "—"

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) return "—"

        return parsedDate.toLocaleString()
    }

    const getMovementStyle = (type) => {
        switch (type) {
            case "Restock":
                return "bg-green-100 text-green-700"
            case "Sale":
                return "bg-blue-100 text-blue-700"
            case "Order Cancellation":
                return "bg-purple-100 text-purple-700"
            case "Adjustment":
                return "bg-amber-100 text-amber-700"
            default:
                return "bg-slate-100 text-slate-700"
        }
    }

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Inventory History
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Review recorded inventory movements and stock changes.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total Movements
                            </p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {totalMovements}
                            </p>
                        </div>
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <FiClipboard size={23} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Restock Operations
                            </p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {restockMovements}
                            </p>
                        </div>
                        <div className="rounded-xl bg-green-50 p-3 text-green-600">
                            <FiPackage size={23} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="relative flex-1">
                        <FiSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product, supplier or reference..."
                            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                    >
                        <option value="All">All movements</option>
                        <option value="Restock">Restocks</option>
                        <option value="Sale">Sales</option>
                        <option value="Order Cancellation">
                            Order cancellations
                        </option>
                        <option value="Adjustment">Adjustments</option>
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <h2 className="font-bold text-slate-900">
                        Stock Movement Records
                    </h2>
                    <span className="text-sm text-slate-500">
                        {filteredHistory.length} records
                    </span>
                </div>

                {filteredHistory.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-16 text-center">
                        <div className="rounded-full bg-slate-100 p-4 text-slate-400">
                            <FiRefreshCw size={28} />
                        </div>
                        <h3 className="mt-4 font-semibold text-slate-800">
                            No inventory movements found
                        </h3>
                        <p className="mt-1 max-w-md text-sm text-slate-500">
                            Restock a product to create your first inventory
                            history record, or change your search filters.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4">Date</th>
                                    <th className="px-5 py-4">Product</th>
                                    <th className="px-5 py-4">Movement</th>
                                    <th className="px-5 py-4">Quantity</th>
                                    <th className="px-5 py-4">Stock Before</th>
                                    <th className="px-5 py-4">Stock After</th>
                                    <th className="px-5 py-4">Supplier / Reference</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredHistory.map((movement) => (
                                    <tr
                                        key={movement.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                            {formatDate(movement.date)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-slate-900">
                                                {movement.productName}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                ID: {movement.productId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMovementStyle(movement.type)}`}
                                            >
                                                {movement.type}
                                            </span>
                                        </td>

                                        <td className={`px-5 py-4 font-semibold ${
                                            movement.type === "Sale" ||(movement.type === "Adjustment" && movement.adjustmentType === "decrease")
                                                ? "text-red-700"
                                                : "text-green-700"
                                        }`}>
                                            {movement.type === "Sale" || (movement.type === "Adjustment" && movement.adjustmentType === "decrease") ? "-" : "+"}
                                            {movement.quantity}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {movement.stockBefore}
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-slate-900">
                                            {movement.stockAfter}
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-slate-700">
                                                {movement.supplier || "—"}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {movement.reference || "No reference"}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminInventoryHistory
