import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderById } from "../../services/purchaseOrderService";
import { useReceivePurchaseOrder } from "../../hooks/useReceivePurchaseOrder";
import { useEffect, useState } from "react";

interface Props {
  purchaseOrderId: number;
  onClose: () => void;
}

export default function ReceivePurchaseOrderModal({
  purchaseOrderId,
  onClose,
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["purchaseOrder", purchaseOrderId],
    queryFn: () => getPurchaseOrderById(purchaseOrderId),
  });

  const receivePurchaseOrderMutation =
  useReceivePurchaseOrder();

  const [receivedItems, setReceivedItems] = useState<
  {
    productId: number;
    quantityReceived: number;
  }[]
>([]);

useEffect(() => {
  if (data) {
    setReceivedItems(
      data.items.map((item) => ({
        productId: item.productId,
        quantityReceived: item.orderedQuantity,
      }))
    );
  }
}, [data]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg p-6">
          Loading...
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[800px] p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Receive Purchase Order
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3">Product</th>
              <th className="border p-3">Ordered Qty</th>
              <th className="border p-3">Receive Qty</th>
            </tr>

          </thead>

          <tbody>

            {data.items.map((item) => (

              <tr key={item.productId}>

                <td className="border p-3">
                  {item.productName}
                </td>

                <td className="border p-3">
                  {item.orderedQuantity}
                </td>

                <td className="border p-3">
                 <input
  type="number"
  value={
    receivedItems.find(
      (x) => x.productId === item.productId
    )?.quantityReceived ?? 0
  }
  onChange={(e) => {
    const value = Number(e.target.value);

    setReceivedItems((prev) =>
      prev.map((x) =>
        x.productId === item.productId
          ? {
              ...x,
              quantityReceived: value,
            }
          : x
      )
    );
  }}
  className="border rounded p-2 w-24"
/>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
  onClick={async () => {
    try {
      await receivePurchaseOrderMutation.mutateAsync({
        id: purchaseOrderId,
        items: receivedItems,
      });

      alert("Purchase Order received successfully.");

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to receive Purchase Order.");
    }
  }}
  className="px-4 py-2 bg-green-600 text-white rounded"
>
  Receive
</button>

        </div>

      </div>
    </div>
  );
}