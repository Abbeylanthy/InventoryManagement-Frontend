import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useProductStockHistory } from "../../hooks/useStockHistory";

interface Props {
  open: boolean;
  onClose: () => void;
  productId: number | null;
}

export default function ViewStockHistoryModal({
  open,
  onClose,
  productId,
}: Props) {

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) {
      setPage(1);
    }
  }, [open, productId]);

  const { data, isLoading, isError } =
    useProductStockHistory(productId, page);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Stock History
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {isLoading ? (

          <div className="text-center py-10">
            Loading...
          </div>

        ) : isError ? (

          <div className="text-center py-10 text-red-600">
            Failed to load stock history.
          </div>

        ) : !data?.items?.length ? (

          <div className="text-center py-10 text-gray-500">
            No stock history found.
          </div>

        ) : (

          <div className="flex-1 overflow-y-auto overflow-x-auto p-6">

            <table className="min-w-full border">

              <thead className="bg-gray-100">

                <tr>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Action</th>
                  <th className="border p-3">Previous Qty</th>
                  <th className="border p-3">Quantity Changed</th>
                  <th className="border p-3">New Qty</th>
                  <th className="border p-3">Note</th>
                </tr>

              </thead>

              <tbody>

                {data.items.map((history) => (

                  <tr
                    key={`${history.createdAt}-${history.productId}-${history.actionType}`}
                  >
                    <td className="border p-3">
                      {new Date(history.createdAt).toLocaleString()}
                    </td>

                    <td className="border p-3">
                      {history.actionType}
                    </td>

                    <td className="border p-3">
                      {history.previousQuantity}
                    </td>

                    <td className="border p-3">
                      {history.quantityChanged}
                    </td>

                    <td className="border p-3">
                      {history.newQuantity}
                    </td>

                    <td className="border p-3">
                      {history.note}
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>

           <div className="flex justify-between items-center p-6 border-t">

              <button
                disabled={!data.hasPrevious}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {data.pageNumber} of {data.totalPages}
              </span>

              <button
                disabled={!data.hasNext}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                Next
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}