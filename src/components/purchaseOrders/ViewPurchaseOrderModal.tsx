import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderById } from "../../services/purchaseOrderService";

interface Props {
  purchaseOrderId: number;
  onClose: () => void;
}

export default function ViewPurchaseOrderModal({
  purchaseOrderId,
  onClose,
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["purchaseOrder", purchaseOrderId],
    queryFn: () => getPurchaseOrderById(purchaseOrderId),
  });

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
      <div className="bg-white rounded-lg shadow-lg w-[900px] max-h-[90vh] overflow-auto p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Purchase Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div>
            <p className="font-semibold">
              Purchase Order Number
            </p>

            <p>{data.purchaseOrderNumber}</p>
          </div>

          <div>
            <p className="font-semibold">
              Supplier
            </p>

            <p>{data.supplierName}</p>
          </div>

          <div>
            <p className="font-semibold">
              Status
            </p>

            <p>{data.status}</p>
          </div>

          <div>
            <p className="font-semibold">
              Created
            </p>

            <p>
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">
              Notes
            </p>

            <p>{data.notes || "-"}</p>
          </div>

        </div>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Ordered Qty</th>
              <th className="p-3 border">Received Qty</th>
              <th className="p-3 border">Unit Cost</th>
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
                  {item.receivedQuantity}
                </td>

                <td className="border p-3">
                  ₦{item.unitCost.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}