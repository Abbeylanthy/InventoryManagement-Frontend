import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import ViewOrderModal from "../../components/orders/ViewOrderModal";
import UpdateOrderStatusModal from "../../components/orders/UpdateOrderStatusModal";
import { useCancelOrder } from "../../hooks/useCancelOrder";

export default function Orders() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [selectedOrder, setSelectedOrder] =
  useState<number | null>(null);

const [openViewModal, setOpenViewModal] =
  useState(false);

  const [openStatusModal, setOpenStatusModal] =
  useState(false);

  

 

const [selectedStatus, setSelectedStatus] =
  useState("");

  const [searchParams] = useSearchParams();

  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = (orderId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmed) return;

  cancelOrderMutation.mutate(orderId);
};

  useEffect(() => {
  const statusFromUrl = searchParams.get("status");

  if (statusFromUrl) {
    setStatus(statusFromUrl);
  }
}, [searchParams]);

  const {
    data,
    isLoading,
    isError,
  } = useOrders(
    page,
    search,
    status
  );

  if (isLoading)
    return <p className="p-6">Loading...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Failed to load orders.
      </p>
    );

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Orders
        </h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <input
        autoFocus
          type="text"
          placeholder="Search order..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border rounded-lg p-3"
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="border rounded-lg p-3"
        >
          <option value="">
            All Status
          </option>

          <option value="PendingPayment">
            Pending Payment
          </option>

          <option value="Paid">
            Paid
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

          <option value="Refunded">
            Refunded
          </option>

        </select>

        <button
          onClick={() => {
            setSearch("");
            setStatus("");
            setPage(1);
          }}
          className="bg-gray-300 rounded-lg px-4 py-3"
        >
          Reset
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Order No
              </th>

              <th className="border p-3">
                Customer
              </th>

              <th className="border p-3">
                Email
              </th>

              <th className="border p-3">
                Total
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Created
              </th>

              <th className="border p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {data?.items?.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found.
                </td>

              </tr>

            ) : (

              data?.items?.map((order) => (

                <tr key={order.id}>

                  <td className="border p-3">
                    {order.orderNumber}
                  </td>

                  <td className="border p-3">
                    {order.customerName}
                  </td>

                  <td className="border p-3">
                    {order.customerEmail}
                  </td>

                  <td className="border p-3">
                    ₦{order.totalAmount.toLocaleString()}
                  </td>

                 <td className="border p-3">

  <span
    className={`px-3 py-1 rounded-full text-white text-sm font-medium
      ${
        order.status === "PendingPayment"
          ? "bg-yellow-500"
          : order.status === "Paid"
          ? "bg-blue-600"
          : order.status === "Processing"
          ? "bg-purple-600"
          : order.status === "Shipped"
          ? "bg-indigo-600"
          : order.status === "Delivered"
          ? "bg-green-600"
          : order.status === "Cancelled"
          ? "bg-red-600"
          : "bg-gray-700"
      }`}
  >

    {order.status === "PendingPayment"
      ? "Pending Payment"
      : order.status}

  </span>

</td>

                  <td className="border p-3">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                <td className="border p-3">

  <div className="flex gap-2">

    <button
      onClick={() => {
        setSelectedOrder(order.id);
        setOpenViewModal(true);
      }}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      View
    </button>


    {["Paid", "Processing", "Shipped"].includes(order.status) && (
      <button
        onClick={() => {
          setSelectedOrder(order.id);
          setSelectedStatus(order.status);
          setOpenStatusModal(true);
        }}
        className="bg-orange-600 text-white px-3 py-1 rounded"
      >
        Update Status
      </button>
    )}

    {["PendingPayment", "Paid"].includes(order.status) && (
      <button
        onClick={() => handleCancelOrder(order.id)}
        disabled={cancelOrderMutation.isPending}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Cancel
      </button>
    )}

  </div>

</td>

                </tr>

              ))

            )}

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

      <ViewOrderModal
  open={openViewModal}
  orderId={selectedOrder}
  onClose={() => setOpenViewModal(false)}
/>

<UpdateOrderStatusModal
  open={openStatusModal}
  orderId={selectedOrder}
  currentStatus={selectedStatus}
  onClose={() => setOpenStatusModal(false)}
/>

    </div>
  );
}