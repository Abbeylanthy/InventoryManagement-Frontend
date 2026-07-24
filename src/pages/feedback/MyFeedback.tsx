import { useState } from "react";
import { useMyFeedback } from "../../hooks/useMyFeedback";

export default function MyFeedback() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>();

  const { data, isLoading, isError } =
    useMyFeedback(page, search, status);

  if (isLoading)
    return <p className="p-6">Loading feedback...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Failed to load feedback.
      </p>
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Feedback
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <input
        autoFocus
          type="text"
          placeholder="Search feedback..."
          className="border rounded-lg p-3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border rounded-lg p-3"
          value={status ?? ""}
          onChange={(e) => {
            setStatus(e.target.value || undefined);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      <div className="space-y-4">

        {data?.items?.length === 0 ? (

          <div className="text-center text-gray-500 py-10">
            You haven't submitted any feedback yet.
          </div>

        ) : (

          data?.items?.map((feedback) => (

            <div
              key={feedback.id}
              className="border rounded-lg p-5 bg-white shadow-sm"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="font-semibold text-lg">
                    {feedback.subject}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {feedback.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Order: {feedback.orderNumber}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    feedback.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : feedback.status === "InProgress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {feedback.status === "InProgress"
                    ? "In Progress"
                    : feedback.status}
                </span>

              </div>

              <div className="mt-3">

                <p className="font-medium">
                  Rating: {"⭐".repeat(feedback.rating)}
                </p>

                <p className="mt-2 text-gray-700">
                  {feedback.message}
                </p>

                <p className="text-xs text-gray-500 mt-4">
                  {new Date(
                    feedback.createdAt
                  ).toLocaleString()}
                </p>

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

    </div>
  );
}