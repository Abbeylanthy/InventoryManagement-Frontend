import { X } from "lucide-react";
import { useWalletById } from "../../hooks/useWalletById";
import { useState } from "react";
import WalletTransactionsModal from "./WalletTransactionsModal";

interface Props {
  open: boolean;
  onClose: () => void;
  walletId: number | null;
}

export default function WalletDetailsModal({
  open,
  onClose,
  walletId,
}: Props) {

  const { data, isLoading, isError } =
    useWalletById(walletId);

    const [openTransactions, setOpenTransactions] =
  useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Wallet Details
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
            Failed to load wallet.
          </div>
        ) : (
          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Customer
                </p>

                <p className="font-semibold">
                  {data?.customerName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-semibold">
                  {data?.customerEmail}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Balance
                </p>

                <p className="font-semibold text-green-600">
                  ₦{data?.balance.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Transactions
                </p>

                <p className="font-semibold">
                  {data?.transactionCount}
                </p>
              </div>

            </div>

            <div className="flex justify-end mt-8">

              <button
  onClick={() => setOpenTransactions(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
>
  View Transactions
</button>

            </div>

          </div>
        )}

      </div>

<WalletTransactionsModal
  open={openTransactions}
  onClose={() => setOpenTransactions(false)}
  walletId={walletId}
/>
    </div>
  );
}