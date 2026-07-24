import { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import type { Notification } from "../../types/notification";
import { useMarkNotificationRead } from "../../hooks/useMarkNotificationRead"

export default function MyNotifications() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useNotifications(
    page,
    search
  );

  const markNotificationMutation = useMarkNotificationRead();

  if (isLoading) return <p className="p-6">Loading...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Failed to load notifications.
      </p>
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        My Notifications
      </h1>

      <input
      autoFocus
        type="text"
        placeholder="Search..."
        className="border rounded-lg p-3 w-full my-6"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="space-y-4">

        {data?.items?.map((notification: Notification) => (

         <div
  key={notification.id}
  onClick={() => {
    if (!notification.isRead) {
      markNotificationMutation.mutate(notification.id);
    }
  }}
  className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
    !notification.isRead
      ? "bg-blue-50"
      : "bg-white"
  }`}
>
            <div className="flex justify-between">

              <h2 className="font-semibold">
                {notification.type}
              </h2>

              {!notification.isRead && (
                <span className="text-blue-600">
                  Unread
                </span>
              )}

            </div>

            <p className="mt-2">
              {notification.message}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

      <div className="flex justify-between mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Previous
        </button>

        <span>
          {data?.pageNumber} / {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Next
        </button>

      </div>

    </div>
  );
}