import { X } from "lucide-react";
import { useState } from "react";
import { useWalletTransactions } from "../../hooks/useWalletTransactions";
import type { WalletTransactionAdmin } from "../../types/wallet";

interface Props {
  open: boolean;
  onClose: () => void;
  walletId: number | null;
}

export default function WalletTransactionsModal({
  open,
  onClose,
  walletId,
}: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } =
    useWalletTransactions(walletId ?? 0, page);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-5xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Wallet Transactions
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {isLoading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-600">
            Failed to load transactions.
          </div>
        ) : (
          <>
            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Reason</th>
                  <th className="text-left p-4">Date</th>
                </tr>

              </thead>

              <tbody>

                {data?.items.map(
                    (transaction:
                        WalletTransactionAdmin) => (
                     
                  <tr
                    key={transaction.id}
                    className="border-b"
                  >
                    <td className="p-4">
                      ₦{transaction.amount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {transaction.type}
                    </td>

                    <td className="p-4">
                      {transaction.reason}
                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.createdAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

            <div className="flex justify-between items-center mt-6">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {data?.pageNumber} of {data?.totalPages}
              </span>

              <button
                disabled={page === data?.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}