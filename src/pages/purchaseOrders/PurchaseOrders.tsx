import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { usePurchaseOrders } from "../../hooks/usePurchaseOrders";
import AddPurchaseOrderModal from "../../components/purchaseOrders/AddPurchaseOrderModal";
import ViewPurchaseOrderModal from "../../components/purchaseOrders/ViewPurchaseOrderModal";
import { useApprovePurchaseOrder } from "../../hooks/useApprovePurchaseOrder";
import ReceivePurchaseOrderModal from "../../components/purchaseOrders/ReceivePurchaseOrderModal";
import { useCancelPurchaseOrder } from "../../hooks/useCancelPurchaseOrder";
import { useSupplierDropdown } from "../../hooks/useSupplierDropdown";

export default function PurchaseOrders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
const { data: currentUser } = useCurrentUser();

const isAdmin =
  currentUser?.roles?.some(
    (r: any) =>
      r.name === "SuperAdmin" ||
      r.name === "Admin"
  );
  const [status, setStatus] = useState("");
const [supplierId, setSupplierId] = useState<number | undefined>();
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] =
    useState<number | null>(null);

const [isViewModalOpen, setIsViewModalOpen] =
    useState(false);

    const [isReceiveModalOpen, setIsReceiveModalOpen] =
  useState(false);

  const {
  data,
  isLoading,
  isError,
} = usePurchaseOrders(
  page,
  search,
  status,
  supplierId,
  fromDate,
  toDate
  );

    const approvePurchaseOrderMutation =
  useApprovePurchaseOrder();

  const cancelPurchaseOrderMutation =
  useCancelPurchaseOrder();

  const { data: suppliers } = useSupplierDropdown();

  if (isLoading) return <>Loading Purchase Orders...</>;

  if (isError) return <>Failed to load purchase orders.</>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Purchase Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage purchase orders
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + New Purchase Order
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">

       <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">

  <input
  autoFocus
    type="text"
    placeholder="Search PO Number..."
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
    className="border rounded-lg p-2"
  />

  <select
    value={status}
    onChange={(e) => {
      setPage(1);
      setStatus(e.target.value);
    }}
    className="border rounded-lg p-2"
  >
    <option value="">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Received">Received</option>
    <option value="Cancelled">Cancelled</option>
  </select>

  <select
    value={supplierId ?? ""}
    onChange={(e) => {
      setPage(1);

      setSupplierId(
        e.target.value
          ? Number(e.target.value)
          : undefined
      );
    }}
    className="border rounded-lg p-2"
  >
    <option value="">All Suppliers</option>

    {suppliers?.map((supplier) => (
      <option
        key={supplier.id}
        value={supplier.id}
      >
        {supplier.name}
      </option>
    ))}
  </select>

  <input
    type="date"
    value={fromDate}
    onChange={(e) => {
      setPage(1);
      setFromDate(e.target.value);
    }}
    className="border rounded-lg p-2"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) => {
      setPage(1);
      setToDate(e.target.value);
    }}
    className="border rounded-lg p-2"
  />

  <button
    onClick={() => {
      setSearch("");
      setStatus("");
      setSupplierId(undefined);
      setFromDate("");
      setToDate("");
      setPage(1);
    }}
    className="bg-gray-300 rounded-lg px-4 py-2 hover:bg-gray-400"
  >
    Reset
  </button>

</div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">PO Number</th>
              <th className="text-left p-4">Supplier</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Created</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {data?.items.map((po) => (

              <tr
                key={po.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {po.purchaseOrderNumber}
                </td>

                <td className="p-4">
                  {po.supplierName}
                </td>

                <td className="p-4">
                  {po.status}
                </td>

                <td className="p-4">
                  {new Date(
                    po.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 flex gap-2">

                 <button
    onClick={() => {
        setSelectedPurchaseOrderId(po.id);
        setIsViewModalOpen(true);
    }}
    className="bg-blue-600 text-white px-3 py-1 rounded"
>
    View
</button>

                 {isAdmin && po.status === "Pending" && (
  <>
    <button
      onClick={async () => {
        const confirmed = window.confirm(
          "Are you sure you want to approve this Purchase Order?"
        );

        if (!confirmed) return;

        try {
          await approvePurchaseOrderMutation.mutateAsync(po.id);
          alert("Purchase Order approved successfully.");
        } catch {
          alert("Failed to approve Purchase Order.");
        }
      }}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Approve
    </button>

    <button
      onClick={async () => {
        const confirmed = window.confirm(
          "Are you sure you want to cancel this Purchase Order?"
        );

        if (!confirmed) return;

        try {
          await cancelPurchaseOrderMutation.mutateAsync(po.id);
          alert("Purchase Order cancelled successfully.");
        } catch {
          alert("Failed to cancel Purchase Order.");
        }
      }}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Cancel
    </button>
  </>
)}

                  {po.status === "Approved" && (
                    <button
  onClick={() => {
    setSelectedPurchaseOrderId(po.id);
    setIsReceiveModalOpen(true);
  }}
  className="bg-orange-600 text-white px-3 py-1 rounded"
>
  Receive
</button>
                  )}

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

     <AddPurchaseOrderModal
  open={openModal}
  onClose={() => setOpenModal(false)}
/>

{isViewModalOpen && selectedPurchaseOrderId && (
  <ViewPurchaseOrderModal
    purchaseOrderId={selectedPurchaseOrderId}
    onClose={() => {
      setIsViewModalOpen(false);
      setSelectedPurchaseOrderId(null);
    }}
  />
)}

{isReceiveModalOpen && selectedPurchaseOrderId && (
  <ReceivePurchaseOrderModal
    purchaseOrderId={selectedPurchaseOrderId}
    onClose={() => {
      setIsReceiveModalOpen(false);
      setSelectedPurchaseOrderId(null);
    }}
  />
)}

</>
  );
}