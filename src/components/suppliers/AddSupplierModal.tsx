import SupplierForm from "./SupplierForm";
import type { Supplier } from "../../types/supplier";

interface Props {
  open: boolean;
  onClose: () => void;
  supplier?: Supplier | null;
}

export default function AddSupplierModal({
  open,
  onClose,
  supplier,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {supplier ? "Edit Supplier" : "Add Supplier"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <SupplierForm
          supplier={supplier}
          onClose={onClose}
        />

      </div>

    </div>
  );
}