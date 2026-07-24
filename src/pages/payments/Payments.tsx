import { useState } from "react";
import { usePayments } from "../../hooks/usePayments";

export default function Payments() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const {
    data,
    isLoading,
    isError,
  } = usePayments(page, search, status);

  if (isLoading)
    return <p className="p-6">Loading payments...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Failed to load payments.
      </p>
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Payments
      </h1>

      <p className="text-gray-500 mt-2">
        Manage all payment transactions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">

        <input
        autoFocus
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg p-3"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg p-3"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Success">Success</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setStatus("");
            setPage(1);
          }}
          className="bg-gray-300 rounded-lg"
        >
          Reset
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3">Reference</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Created</th>
              <th className="border p-3">Paid At</th>
            </tr>

          </thead>

          <tbody>

            {data?.items.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No payments found.
                </td>
              </tr>

            ) : (

              data?.items.map((payment) => (

                <tr key={payment.id}>

                  <td className="border p-3">
                    {payment.reference}
                  </td>

                  <td className="border p-3">
                    {payment.customerName}
                  </td>

                  <td className="border p-3">
                    {payment.customerEmail}
                  </td>

                  <td className="border p-3">
                    ₦{payment.amount.toLocaleString()}
                  </td>

                  <td className="border p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          payment.status === "Success"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td className="border p-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="border p-3">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}