import { useState } from "react";
import { useCarts } from "../../hooks/useCarts";
import ViewCartModal from "../../components/cart/ViewCartModal";

export default function Cart() {
 const [page, setPage] = useState(1);

const { data, isLoading, isError } =
  useCarts(page);

const [selectedCartId, setSelectedCartId] = useState<number | null>(null);
const [openModal, setOpenModal] = useState(false);

  if (isLoading) {
    return <h2>Loading carts...</h2>;
  }

  if (isError) {
    return <h2>Failed to load carts.</h2>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Customer Carts
          </h1>

          <p className="text-gray-500 mt-1">
            View customer shopping carts.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Created</th>
              <th className="text-left p-4">Grand Total</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.items.map((cart) => (
              <tr
                key={cart.cartId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{cart.customerName}</td>

                <td className="p-4">
                  {cart.customerEmail}
                </td>

                <td className="p-4">
                  {new Date(cart.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 font-semibold">
                  ₦{cart.grandTotal.toLocaleString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedCartId(cart.cartId)
                      setOpenModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
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

      <ViewCartModal
  open={openModal}
  onClose={() => {
    setOpenModal(false);
    setSelectedCartId(null);
  }}
  cartId={selectedCartId}
/>
    </div>
  );
}