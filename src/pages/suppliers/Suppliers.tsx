import { useState } from "react";
import type { Supplier } from "../../types/supplier";
import { useSuppliers } from "../../hooks/useSuppliers";
import { useDebounce } from "../../hooks/useDebounce";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDeleteSupplier } from "../../hooks/useDeleteSupplier";
import AddSupplierModal from "../../components/suppliers/AddSupplierModal";

export default function Suppliers() {
  const [page, setPage] = useState(1);
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);
const { data: currentUser } = useCurrentUser();

const isAdmin =
  currentUser?.roles?.some(
    (r: any) =>
      r.name === "SuperAdmin" ||
      r.name === "Admin"
  );
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } =
    useSuppliers(page, debouncedSearch);

  const deleteSupplierMutation = useDeleteSupplier();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) return;

    try {
      await deleteSupplierMutation.mutateAsync(id);

      alert("Supplier deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete supplier.");
    }
  };

  if (isLoading) return <>Loading Suppliers...</>;

  if (isError) return <>Failed to load suppliers.</>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Suppliers
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your suppliers
          </p>
        </div>

        {isAdmin && (
  <button
    onClick={() => setOpenModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
  >
    + Add Supplier
  </button>
)}

      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <input
        autoFocus
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Address</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {data?.items.map((supplier) => (

              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {supplier.name}
                </td>

                <td className="p-4">
                  {supplier.contactEmail}
                </td>

                <td className="p-4">
                  {supplier.phoneNumber}
                </td>

                <td className="p-4">
                  {supplier.address}
                </td>

              <td className="p-4 flex gap-2">
  {isAdmin && (
    <>
      <button
        onClick={() => {
          setSelectedSupplier(supplier);
          setOpenModal(true);
        }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(supplier.id)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </>
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

      <AddSupplierModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier}
      />
    </>
  );
}