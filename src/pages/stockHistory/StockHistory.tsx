import { useState } from "react";
import { useStockHistory } from "../../hooks/useStockHistory";

export default function StockHistory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("");

  const {
    data,
    isLoading,
    isError,
  } = useStockHistory(
    page,
    search,
    actionType
  );

  if (isLoading)
    return <p className="p-6">Loading...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Failed to load stock history.
      </p>
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Stock History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <input
        autoFocus
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border rounded-lg p-2"
        />

        <select
          value={actionType}
          onChange={(e) => {
            setPage(1);
            setActionType(e.target.value);
          }}
          className="border rounded-lg p-2"
        >
          <option value="">All Actions</option>
          <option value="StockIn">Stock In</option>
          <option value="StockOut">Stock Out</option>
          <option value="StockAdjustment">
            Stock Adjustment
          </option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setActionType("");
            setPage(1);
          }}
          className="bg-gray-300 rounded-lg px-4 py-2"
        >
          Reset
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Product
              </th>

              <th className="border p-3">
                Action
              </th>

              <th className="border p-3">
                Previous
              </th>

              <th className="border p-3">
                Changed
              </th>

              <th className="border p-3">
                New
              </th>

              <th className="border p-3">
                Performed By
              </th>

              <th className="border p-3">
                Date
              </th>

            </tr>

          </thead>

<tbody>

  {data?.items.length === 0 ? (

    <tr>
      <td
        colSpan={7}
        className="text-center py-8 text-gray-500"
      >
        No stock history found.
      </td>
    </tr>

  ) : (

    data?.items.map((item) => (

      <tr key={`${item.productId}-${item.createdAt}`}>

        <td className="border p-3">
          {item.productName}
        </td>

                <td className="border p-3">
  <span
    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
      item.actionType === "StockIn"
        ? "bg-green-600"
        : item.actionType === "StockOut"
        ? "bg-red-600"
        : "bg-orange-500"
    }`}
  >
    {item.actionType === "StockIn"
      ? "Stock In"
      : item.actionType === "StockOut"
      ? "Stock Out"
      : "Stock Adjustment"}
  </span>
</td>

                <td className="border p-3">
                  {item.previousQuantity}
                </td>

               <td
  className={`border p-3 font-semibold ${
    item.quantityChanged > 0
      ? "text-green-600"
      : "text-red-600"
  }`}
>
  {item.quantityChanged > 0
    ? `+${item.quantityChanged}`
    : item.quantityChanged}
</td>

                <td className="border p-3">
                  {item.newQuantity}
                </td>

                <td className="border p-3">
                  {item.performedBy}
                </td>

                <td className="border p-3">
                 {new Date(item.createdAt).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}{" "}
{new Date(item.createdAt).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}
                </td>

              </tr>

            )))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}