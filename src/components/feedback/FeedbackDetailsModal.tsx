import { X } from "lucide-react";
import { useFeedbackById } from "../../hooks/useFeedbackById";

interface Props {
  feedbackId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function FeedbackDetailsModal({
  feedbackId,
  open,
  onClose,
}: Props) {
  const { data, isLoading } =
    useFeedbackById(feedbackId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[600px] max-w-[90%]">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            Feedback Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6">

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">

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
                  Product
                </p>

                <p>{data?.productName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Order Number
                </p>

                <p>{data?.orderNumber}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Rating
                </p>

                <p>{"⭐".repeat(data?.rating ?? 0)}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Subject
                </p>

                <p>{data?.subject}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Message
                </p>

                <div className="bg-gray-100 rounded-lg p-4">
                  {data?.message}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Status
                </p>

                <p>{
                data?.status === 0
                ? "Open"
                : data?.status === 1
                ? "In Progress"
                : "Resolved"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Date
                </p>

                <p>
                  {data &&
                    new Date(
                      data.createdAt
                    ).toLocaleString()}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}