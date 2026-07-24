import { useState } from "react";
import { X } from "lucide-react";
import { useRequestWithdrawal } from "../../hooks/useWallet";
import type { WithdrawRequest } from "../../types/wallet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawModal({
  open,
  onClose,
}: Props) {
  const withdrawalMutation = useRequestWithdrawal();

  const [form, setForm] = useState<WithdrawRequest>({
    amount: 0,
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  if (!open) return null;

  const handleSubmit = async () => {
    if (
      form.amount <= 0 ||
      !form.bankName ||
      !form.accountNumber ||
      !form.accountName
    ) {
      alert("Please complete all fields.");
      return;
    }

    try {
      await withdrawalMutation.mutateAsync(form);

      alert("Withdrawal request submitted successfully.");

      setForm({
        amount: 0,
        bankName: "",
        accountNumber: "",
        accountName: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to submit withdrawal request.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Withdraw Funds
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bank Name
            </label>

            <input
              value={form.bankName}
              onChange={(e) =>
                setForm({
                  ...form,
                  bankName: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Account Number
            </label>

            <input
              value={form.accountNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  accountNumber: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Account Name
            </label>

            <input
              value={form.accountName}
              onChange={(e) =>
                setForm({
                  ...form,
                  accountName: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={withdrawalMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
          >
            {withdrawalMutation.isPending
              ? "Submitting..."
              : "Submit Request"}
          </button>

        </div>

      </div>
    </div>
  );
}