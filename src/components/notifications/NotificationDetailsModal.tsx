import { X } from "lucide-react";
import { useNotificationById } from "../../hooks/useNotificationById";

interface Props {
  notificationId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function NotificationDetailsModal({
  notificationId,
  open,
  onClose,
}: Props) {
  const { data, isLoading } =
    useNotificationById(notificationId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[500px] max-w-[90%]">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            Notification Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6">

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    User
                  </p>
                  <p className="font-semibold">
                    {data?.userName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>
                  <p>{data?.userEmail}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Type
                  </p>
                  <p>{data?.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>
                  <p>
                    {data?.isRead ? "Read" : "Unread"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Message
                  </p>

                  <div className="bg-gray-100 rounded-lg p-4 mt-1">
                    {data?.message}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
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
            </>
          )}

        </div>

      </div>

    </div>
  );
}