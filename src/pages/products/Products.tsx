import { useState } from "react";
import type { Product } from "../../types/product";
import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import AddProductModal from "../../components/products/AddProductModal";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useToggleProduct } from "../../hooks/useToggleProduct";
import AddToCartModal from "../../components/cart/AddToCartModal";
import ViewProductModal from "../../components/products/ViewProductModal";

export default function Products() {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const { data: currentUser } = useCurrentUser();

const isAdmin =
  currentUser?.roles?.some(
    (r: any) =>
      r.name === "SuperAdmin" ||
      r.name === "Admin"
  );
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const [viewModalOpen, setViewModalOpen] = useState(false);

const [viewProductId, setViewProductId] = useState<number | null>(null);

const [cartProduct, setCartProduct] = useState<{
  id: number;
  name: string;
} | null>(null);

  const { data, isLoading, isError } = useProducts(page, debouncedSearch);
  const deleteProductMutation = useDeleteProduct();
  const toggleProductMutation = useToggleProduct();

  const handleToggleActive = async (
  id: number,
  currentStatus: boolean
) => {
  try {
    await toggleProductMutation.mutateAsync({
      id,
      isActive: !currentStatus,
    });
  } catch (error) {
    console.error(error);
    alert("Failed to update product status.");
  }
};

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await deleteProductMutation.mutateAsync(id);
    alert("Product deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  }
};

  if (isLoading) {
    return <h2>Loading Products...</h2>;
  }

  if (isError) {
    return <h2>Failed to load products.</h2>;
  }

  return (
    <div>

     <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      📦 Products
    </h1>

    <p className="text-gray-500 mt-1">
      Manage your inventory products
    </p>
  </div>

  {isAdmin && (
  <button
    onClick={() => setOpenModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow transition"
  >
    + Add Product
  </button>
)}
</div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
  <p className="text-gray-500">
    Total Products
  </p>

  <h2 className="text-4xl font-bold text-blue-600 mt-2">
    {data?.totalCount}
  </h2>
</div>

<div className="mb-6">
  <input
  autoFocus
    type="text"
    placeholder="🔍 Search products..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Quantity</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>
            
          </tr>
        </thead>

        <tbody>
          {data?.items.map((product) => (
            <tr
  key={product.id}
  className="border-b hover:bg-gray-50 transition"
>
              <td className="p-4">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">
                ₦{product.price.toLocaleString()}
              </td>

              <td className="p-4">{product.quantity}</td>

             <td className="p-4">
  <button
    onClick={() =>
      handleToggleActive(product.id, product.isActive)
    }
    className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer ${
      product.isActive
        ? "bg-green-100 text-green-700 hover:bg-green-200"
        : "bg-red-100 text-red-700 hover:bg-red-200"
    }`}
  >
    {product.isActive ? "Active" : "Inactive"}
  </button>
</td>

<td className="p-4">
  <div className="flex gap-2">
  <button
  onClick={() => {
    setViewProductId(product.id);
    setViewModalOpen(true);
  }}
  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
>
  View
</button>

{isAdmin && (
  <>
    <button
      onClick={() => {
        setSelectedProduct(product);
        setOpenModal(true);
      }}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(product.id)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Delete
    </button>
  </>
)}
  </div>
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
      <AddProductModal
  open={openModal}
  onClose={() => {
    setOpenModal(false);
    setSelectedProduct(null);
  }}
  product={selectedProduct}
/>

<AddToCartModal
  open={cartModalOpen}
  onClose={() => {
    setCartModalOpen(false);
    setCartProduct(null);
  }}
  productId={cartProduct?.id ?? null}
  productName={cartProduct?.name ?? ""}
/>

<ViewProductModal
  open={viewModalOpen}
  productId={viewProductId}
  onClose={() => {
    setViewModalOpen(false);
    setViewProductId(null);
  }}
/>
    </div>
  );
}