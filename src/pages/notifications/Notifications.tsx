import { useState } from "react";
import { useAllNotifications } from "../../hooks/useAllNotifications";
import type { Notification } from "../../types/notification";
import NotificationDetailsModal from "../../components/notifications/NotificationDetailsModal";

export default function Notifications() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedNotificationId, setSelectedNotificationId] =
  useState<number | null>(null);

const [openModal, setOpenModal] =
  useState(false);
  const [isRead, setIsRead] = useState<boolean | undefined>(undefined);

  const { data, isLoading, isError } = useAllNotifications(
    page,
    search,
    isRead
  );

  if (isLoading) {
    return <p className="p-6">Loading notifications...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load notifications.
      </p>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Notifications
      </h1>

      <input
      autoFocus
        type="text"
        placeholder="Search notifications..."
        className="border rounded-lg p-3 w-full my-6"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

    <div className="flex gap-3 mb-6">

  <button
    onClick={() => {
      setIsRead(undefined);
      setPage(1);
    }}
    className={`px-4 py-2 rounded ${
      isRead === undefined
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => {
      setIsRead(true);
      setPage(1);
    }}
    className={`px-4 py-2 rounded ${
      isRead === true
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Read
  </button>

  <button
    onClick={() => {
      setIsRead(false);
      setPage(1);
    }}
    className={`px-4 py-2 rounded ${
      isRead === false
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Unread
  </button>

</div>

      <div className="space-y-4">

        {data?.items?.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No notifications found.
          </div>
        ) : (
          data?.items?.map((notification:
            Notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 ${
                !notification.isRead
                  ? "bg-blue-50"
                  : "bg-white"
              }`}
            >
             <div className="flex justify-between items-start">

  <div>

    <h2 className="font-semibold">
      {notification.type}
    </h2>

    <p className="text-sm text-gray-600">
      {notification.userName}
    </p>

    <p className="text-xs text-gray-500">
      {notification.userEmail}
    </p>

  </div>

  <span
    className={`px-2 py-1 rounded text-xs font-medium ${
      notification.isRead
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {notification.isRead ? "Read" : "Unread"}
  </span>

</div>

              <p className="mt-2">
                {notification.message}
              </p>

             <div className="flex justify-between items-center mt-3">

  <p className="text-sm text-gray-500">
    {new Date(notification.createdAt).toLocaleString()}
  </p>

  <button
    onClick={() => {
      setSelectedNotificationId(notification.id);
      setOpenModal(true);
    }}
    className="text-blue-600 hover:text-blue-800 font-medium"
  >
    View
  </button>

</div>
            </div>
          ))
        )}

      </div>

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Next
        </button>

      </div>

      <NotificationDetailsModal
  notificationId={selectedNotificationId}
  open={openModal}
  onClose={() => {
    setOpenModal(false);
    setSelectedNotificationId(null);
  }}
/>

    </div>
  );
}