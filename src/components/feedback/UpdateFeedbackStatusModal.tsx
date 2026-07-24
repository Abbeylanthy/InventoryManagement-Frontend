import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  currentStatus: "Open" | "InProgress" | "Resolved";
  onClose: () => void;
  onSave: (status: "Open" | "InProgress" | "Resolved") => void;
}

export default function UpdateFeedbackStatusModal({
  open,
  currentStatus,
  onClose,
  onSave,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[420px] max-w-[90%]">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            Update Feedback Status
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="block text-sm text-gray-500 mb-2">
              Status
            </label>

            <select
              className="border rounded-lg p-3 w-full"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "Open"
                    | "InProgress"
                    | "Resolved"
                )
              }
            >
              <option value="Open">Open</option>
              <option value="InProgress">
                In Progress
              </option>
              <option value="Resolved">
                Resolved
              </option>
            </select>

          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(status)}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}