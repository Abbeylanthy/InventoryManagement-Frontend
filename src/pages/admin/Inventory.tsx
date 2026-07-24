import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";
import ViewStockHistoryModal from "../../components/stockHistory/ViewStockHistoryModal";

export default function Inventory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [stockFilter, setStockFilter] = useState<
    "all" | "in-stock" | "low-stock" | "out-of-stock"
  >("all");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useProducts(
    page,
    debouncedSearch
  );

  const [openHistoryModal, setOpenHistoryModal] = useState(false);

const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const filteredProducts =
    data?.items.filter((product) => {
      switch (stockFilter) {
        case "in-stock":
          return product.quantity > 10;

        case "low-stock":
          return product.quantity > 0 && product.quantity <= 10;

        case "out-of-stock":
          return product.quantity === 0;

        default:
          return true;
      }
    }) ?? [];

  if (isLoading) {
    return <h2>Loading Inventory...</h2>;
  }

  if (isError) {
    return <h2>Failed to load inventory.</h2>;
  }

  return (
    
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            📦 Inventory
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor inventory levels and stock status.
          </p>
        </div>

      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500">
      Total Products
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {data?.totalCount}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500">
      In Stock
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        data?.items.filter(
          (p) => p.quantity > 10
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500">
      Low Stock
    </p>

    <h2 className="text-4xl font-bold text-yellow-500 mt-2">
      {
        data?.items.filter(
          (p) => p.quantity > 0 && p.quantity <= 10
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500">
      Out of Stock
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {
        data?.items.filter(
          (p) => p.quantity === 0
        ).length
      }
    </h2>
  </div>

</div>

      <div className="mb-6">

        <input
        autoFocus
          type="text"
          placeholder="🔍 Search inventory..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="flex gap-3 mb-6 flex-wrap">

  <button
    onClick={() => setStockFilter("all")}
    className={`px-4 py-2 rounded-lg ${
      stockFilter === "all"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setStockFilter("in-stock")}
    className={`px-4 py-2 rounded-lg ${
      stockFilter === "in-stock"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    In Stock
  </button>

  <button
    onClick={() => setStockFilter("low-stock")}
    className={`px-4 py-2 rounded-lg ${
      stockFilter === "low-stock"
        ? "bg-yellow-500 text-white"
        : "bg-gray-200"
    }`}
  >
    Low Stock
  </button>

  <button
    onClick={() => setStockFilter("out-of-stock")}
    className={`px-4 py-2 rounded-lg ${
      stockFilter === "out-of-stock"
        ? "bg-red-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Out of Stock
  </button>

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Product
              </th>

              <th className="text-left p-4">
                Category
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Quantity
              </th>

              <th className="text-left p-4">
                Stock Status
              </th>

              <th className="text-left p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ₦{product.price.toLocaleString()}
                </td>

                <td className="p-4 font-semibold">
                  {product.quantity}
                </td>

                <td className="p-4">

                  {product.quantity === 0 ? (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Out of Stock
                    </span>

                  ) : product.quantity <= 10 ? (

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Low Stock
                    </span>

                  ) : (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      In Stock
                    </span>

                  )}

                </td>

                <td className="p-4">

                 <button
  onClick={() => {
    setSelectedProductId(product.id);
    setOpenHistoryModal(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  View History
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

      <ViewStockHistoryModal
  open={openHistoryModal}
  productId={selectedProductId}
  onClose={() => {
    setOpenHistoryModal(false);
    setSelectedProductId(null);
  }}
/>

    </div>
  );
}