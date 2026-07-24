import { useState } from "react";
import { useWallets } from "../../hooks/useWallets";
import WalletDetailsModal from "../../components/wallet/WalletDetailsModal";

export default function Wallets() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } =
    useWallets(page, search);

    const [selectedWalletId, setSelectedWalletId] =
  useState<number | null>(null);

const [openModal, setOpenModal] =
  useState(false);

  if (isLoading) {
    return <h2>Loading wallets...</h2>;
  }

  if (isError) {
    return <h2>Failed to load wallets.</h2>;
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Wallets
          </h1>

          <p className="text-gray-500 mt-1">
            View all customer wallets.
          </p>
        </div>

        <input
        autoFocus
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Balance</th>
              <th className="text-left p-4">Transactions</th>
              <th className="text-left p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {data?.items.map((wallet) => (

              <tr
                key={wallet.walletId}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {wallet.customerName}
                </td>

                <td className="p-4">
                  {wallet.customerEmail}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  ₦{wallet.balance.toLocaleString()}
                </td>

                <td className="p-4">
                  {wallet.transactionCount}
                </td>

                <td className="p-4">

                 <button
  onClick={() => {
    setSelectedWalletId(wallet.walletId);
    setOpenModal(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
  View
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

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

      <WalletDetailsModal
  open={openModal}
  onClose={() => {
    setOpenModal(false);
    setSelectedWalletId(null);
  }}
  walletId={selectedWalletId}
/>

    </div>
  );
}