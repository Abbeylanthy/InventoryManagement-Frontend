import { useState } from "react";
import { useWithdrawals } from "../../hooks/useWithdrawals";
import { useApproveWithdrawal } from "../../hooks/useWithdrawals";

export default function Withdrawals() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } =
    useWithdrawals(page, search, status);

    const approveMutation = useApproveWithdrawal();

  if (isLoading)
    return <p>Loading withdrawals...</p>;

  if (isError)
    return <p>Failed to load withdrawals.</p>;

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Withdrawals
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

        </div>

      </div>

      <table className="w-full bg-white rounded-xl shadow">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Bank</th>
            <th className="p-4 text-left">Account</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>

          {data?.items.map((withdrawal) => (

            <tr
              key={withdrawal.id}
              className="border-b"
            >

              <td className="p-4">
                {withdrawal.customerName}
              </td>

              <td className="p-4">
                ₦{withdrawal.amount.toLocaleString()}
              </td>

              <td className="p-4">
                {withdrawal.bankName}
              </td>

              <td className="p-4">
                {withdrawal.accountNumber}
              </td>

              <td className="p-4">
                {withdrawal.status}
              </td>

              <td className="p-4">
                {new Date(
                  withdrawal.createdAt
                ).toLocaleString()}
              </td>

              <td className="p-4">

                {withdrawal.status === "Pending" && (
                 <button
  disabled={approveMutation.isPending}
  onClick={async () => {
    const confirmed = window.confirm(
      "Approve this withdrawal?"
    );

    if (!confirmed) return;

    try {
      await approveMutation.mutateAsync(withdrawal.id);
      alert("Withdrawal approved successfully.");
    } catch {
      alert("Failed to approve withdrawal.");
    }
  }}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
>
  {approveMutation.isPending
    ? "Approving..."
    : "Approve"}
</button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
}