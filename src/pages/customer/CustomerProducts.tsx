import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";
import AddToCartModal from "../../components/cart/AddToCartModal";

export default function CustomerProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [cartModalOpen, setCartModalOpen] = useState(false);

  const [cartProduct, setCartProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data, isLoading, isError } = useProducts(
    page,
    debouncedSearch
  );

  if (isLoading) return <h2>Loading Products...</h2>;

  if (isError) return <h2>Failed to load products.</h2>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          🛍 Products
        </h1>

        <p className="text-gray-500">
          Browse available products
        </p>
      </div>

      <input
      autoFocus
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full border rounded-lg p-3 mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {data?.items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
  Category: {product.category}
</p>

            <p className="text-2xl font-bold text-blue-600 mt-3">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="mt-4">
  {product.isActive && product.quantity > 0 ? (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      In Stock
    </span>
  ) : (
    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
      Out of Stock
    </span>
  )}
</div>

            <button
  disabled={product.quantity <= 0 || !product.isActive}
              onClick={() => {
                setCartProduct({
                  id: product.id,
                  name: product.name,
                });

                setCartModalOpen(true);
              }}
              className="w-full mt-6 bg-blue-600 text-white rounded-lg py-3 disabled:bg-gray-400"
            >
              Add To Cart
            </button>

          </div>
        ))}

      </div>

      <div className="flex justify-between items-center mt-8">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>

      </div>

      <AddToCartModal
        open={cartModalOpen}
        onClose={() => {
          setCartModalOpen(false);
          setCartProduct(null);
        }}
        productId={cartProduct?.id ?? null}
        productName={cartProduct?.name ?? ""}
      />

    </div>
  );
}