import { X } from "lucide-react";
import { useOrderDetails } from "../../hooks/useOrderDetails";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  orderId: number | null;
  onClose: () => void;
  showFeedbackButton?: boolean;
}

export default function ViewOrderModal({
  open,
  orderId,
  onClose,
  showFeedbackButton = false,
}: Props) {
  const { data, isLoading } = useOrderDetails(
    orderId ?? 0,
    open && orderId !== null
  );

  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Order Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {isLoading ? (

          <p>Loading...</p>

        ) : (

          <>
            <div className="grid grid-cols-2 gap-4 mb-6">

              <div>
                <p className="text-gray-500">
                  Order Number
                </p>

                <p className="font-semibold">
                  {data?.orderNumber}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Status
                </p>

                <p className="font-semibold">
                  {data?.status}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Created
                </p>

                <p>
                  {new Date(
                    data!.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Total
                </p>

                <p className="font-bold text-green-700">
                  ₦
                  {data?.totalAmount.toLocaleString()}
                </p>
              </div>

            </div>

            <div className="mb-6">

              <h3 className="font-semibold mb-2">
                Shipping Address
              </h3>

              <p>
                {data?.shippingAddress}
              </p>

            </div>

            <div className="mb-6">

              <h3 className="font-semibold mb-2">
                Notes
              </h3>

              <p>
                {data?.notes || "-"}
              </p>

            </div>

            <h3 className="font-semibold mb-3">
              Order Items
            </h3>

            <table className="min-w-full border">

              <thead className="bg-gray-100">

                <tr>

                  <th className="border p-2">
                    Product
                  </th>

                  <th className="border p-2">
                    Qty
                  </th>

                  <th className="border p-2">
                    Unit Price
                  </th>

                 <th className="border p-2">
  Total
</th>

{showFeedbackButton && data?.status === "Delivered" && (
  <th className="border p-2">
    Feedback
  </th>
)}

                </tr>

              </thead>

              <tbody>

                {data?.items.map((item) => (

                  <tr key={item.productId}>

                    <td className="border p-2">
                      {item.productName}
                    </td>

                    <td className="border p-2 text-center">
                      {item.quantity}
                    </td>

                    <td className="border p-2">
                      ₦
                      {item.unitPrice.toLocaleString()}
                    </td>

                    <td className="border p-2 font-semibold">
                      ₦
                      {item.totalPrice.toLocaleString()}
                    </td>

                    {showFeedbackButton && data?.status === "Delivered" && (
  <td className="border p-2 text-center">
    <button
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      onClick={() => {
  navigate(
    `/create-feedback?orderId=${orderId}&productId=${item.productId}`
  );

  onClose();
}}
    >
      Leave Feedback
    </button>
  </td>
)}

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="flex justify-end mt-6">

              <button
                onClick={onClose}
                className="bg-gray-700 text-white px-5 py-2 rounded"
              >
                Close
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}