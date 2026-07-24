import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUpdateOrderStatus } from "../../hooks/useUpdateOrderStatus";

interface Props {
  open: boolean;
  orderId: number | null;
  currentStatus: string;
  onClose: () => void;
}

const getAllowedStatuses = (currentStatus: string) => {
  switch (currentStatus) {
    case "Paid":
      return ["Processing"];

    case "Processing":
      return ["Shipped"];

    case "Shipped":
      return ["Delivered"];

    default:
      return [];
  }
};

export default function UpdateOrderStatusModal({
  open,
  orderId,
  currentStatus,
  onClose,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  const allowedStatuses = getAllowedStatuses(currentStatus);

  const updateMutation = useUpdateOrderStatus();

  useEffect(() => {
  if (allowedStatuses.length > 0) {
    setStatus(allowedStatuses[0]);
  } else {
    setStatus("");
  }
}, [currentStatus]);

  if (!open) return null;

  const handleUpdate = () => {
    if (!orderId) return;

    updateMutation.mutate(
      {
        orderId,
        status,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold">
            Update Order Status
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <p className="mb-2 text-gray-500">
          Current Status
        </p>

        <p className="font-semibold mb-6">
          {currentStatus}
        </p>

        <select
  disabled={allowedStatuses.length === 0}

  
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg p-3 w-full"
        >
            {allowedStatuses.length === 0 && (
  <p className="text-sm text-gray-500 mt-2">
    This order has reached its final status and cannot be updated.
  </p>
)}

          {allowedStatuses.map((s) => (
  <option
    key={s}
    value={s}
  >
    {s}
  </option>
))}
        </select>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={
  updateMutation.isPending ||
  allowedStatuses.length === 0
}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {updateMutation.isPending
              ? "Updating..."
              : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
}