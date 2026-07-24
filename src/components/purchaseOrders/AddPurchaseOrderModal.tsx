import PurchaseOrderForm from "./PurchaseOrderForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddPurchaseOrderModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Create Purchase Order
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <PurchaseOrderForm onClose={onClose} />

      </div>

    </div>
  );
}