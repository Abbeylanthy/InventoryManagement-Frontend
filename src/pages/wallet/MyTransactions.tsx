import { useState } from "react";
import { useMyTransactions } from "../../hooks/useMyTransactions";
import type { WalletTransactionDto } from "../../types/wallet";

export default function MyTransactions() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } =
    useMyTransactions(page, 10);

  if (isLoading)
    return <p>Loading transactions...</p>;

  if (isError)
    return <p>Failed to load transactions.</p>;

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Transactions
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Amount</th>
            </tr>
          </thead>

          <tbody>
  {data?.items.map(
    (
      transaction: WalletTransactionDto,
      index: number
    ) => (
      <tr
        key={index}
        className="border-b hover:bg-gray-50"
      >
        <td className="p-4">
          {new Date(
            transaction.createdAt
          ).toLocaleString()}
        </td>

        <td className="p-4">
          {transaction.reason}
        </td>

        <td className="p-4">
          <span
            className={
              transaction.type === "Credit"
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {transaction.type}
          </span>
        </td>

        <td
          className={
            transaction.type === "Credit"
              ? "p-4 text-green-600 font-semibold"
              : "p-4 text-red-600 font-semibold"
          }
        >
          {transaction.type === "Debit"
            ? `-₦${Math.abs(
                transaction.amount
              ).toLocaleString()}`
            : `₦${transaction.amount.toLocaleString()}`}
        </td>
      </tr>
    )
  )}
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