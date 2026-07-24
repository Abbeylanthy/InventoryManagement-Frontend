import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCreateFeedback } from "../../hooks/useCreateFeedback";
import { useNavigate } from "react-router-dom";

export default function CreateFeedback() {
  const [searchParams] = useSearchParams();

  const orderId = Number(searchParams.get("orderId"));
const productId = Number(searchParams.get("productId"));

const createFeedbackMutation = useCreateFeedback();
const navigate = useNavigate();

  const [rating, setRating] = useState(5);
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");

  return (
    <div className="p-6 max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Leave Feedback
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">

  <div>
    <label className="font-medium">Rating</label>

    <select
      value={rating}
      onChange={(e) => setRating(Number(e.target.value))}
      className="w-full border rounded-lg p-3 mt-2"
    >
      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
      <option value={4}>⭐⭐⭐⭐ (4)</option>
      <option value={3}>⭐⭐⭐ (3)</option>
      <option value={2}>⭐⭐ (2)</option>
      <option value={1}>⭐ (1)</option>
    </select>
  </div>

  <div>
    <label className="font-medium">Subject</label>

    <input
      type="text"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Enter subject"
    />
  </div>

  <div>
    <label className="font-medium">Message</label>

    <textarea
      rows={5}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Write your feedback..."
    />
  </div>

  <div className="flex justify-end">

   <button
  onClick={() => {
    createFeedbackMutation.mutate(
      {
        orderId,
        productId,
        rating,
        subject,
        message,
      },
      {
        onSuccess: () => {
          alert("Feedback submitted successfully.");

          navigate("/my-orders");
        },

        onError: (error: any) => {
          alert(
            error?.response?.data?.message ??
            error?.response?.data ??
            "Unable to submit feedback."
          );
        },
      }
    );
  }}
  disabled={createFeedbackMutation.isPending}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
>
  {createFeedbackMutation.isPending
    ? "Submitting..."
    : "Submit Feedback"}
</button>

  </div>

</div>

    </div>
  );
}