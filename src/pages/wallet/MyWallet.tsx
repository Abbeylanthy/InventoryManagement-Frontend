import { Link } from "react-router-dom";
import { Wallet, ArrowDownCircle } from "lucide-react";
import { useMyWallet } from "../../hooks/useWallet";
import { useState } from "react";
import WithdrawModal from "../../components/wallet/WithdrawModal";

export default function MyWallet() {
  const { data, isLoading, isError } = useMyWallet();
  const [openWithdraw, setOpenWithdraw] = useState(false);

  if (isLoading) {
    return <p>Loading wallet...</p>;
  }

  if (isError || !data) {
    return <p>Failed to load wallet.</p>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Wallet
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="flex items-center gap-3 mb-3">
          <Wallet className="text-green-600" />
          <h2 className="text-xl font-semibold">
            Wallet Balance
          </h2>
        </div>

        <p className="text-4xl font-bold text-green-600">
          ₦{data.balance.toLocaleString()}
        </p>

        <div className="flex gap-3 mt-6">

          <button
          onClick={() =>
            setOpenWithdraw(true)}
             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
            <ArrowDownCircle size={18} />
            Withdraw Funds
          </button>

          <Link
            to="/my-transactions"
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
          >
            View All Transactions
          </Link>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <h2 className="text-xl font-semibold">
            Recent Transactions
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-right p-4">Amount</th>
            </tr>

          </thead>

          <tbody>

            {data.transactions.map((transaction, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {transaction.type}
                </td>

                <td className="p-4">
                  {transaction.reason}
                </td>

                <td
                  className={`p-4 text-right font-semibold ${
                    transaction.type === "Credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "Debit"
  ? `-₦${Math.abs(transaction.amount).toLocaleString()}`
  : `+₦${transaction.amount.toLocaleString()}`}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <WithdrawModal
      open={openWithdraw}
      onClose={() =>
        setOpenWithdraw(false)}
        />

    </div>
  );
}