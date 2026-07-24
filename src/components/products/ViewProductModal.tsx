import { useProduct } from "../../hooks/useProduct";

interface Props {
  open: boolean;
  productId: number | null;
  onClose: () => void;
}

export default function ViewProductModal({
  open,
  productId,
  onClose,
}: Props) {
  const { data: product, isLoading } = useProduct(productId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✖
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Name:</strong> {product?.name}</p>

            <p><strong>Description:</strong> {product?.description}</p>

            <p><strong>Category:</strong> {product?.category}</p>

            <p><strong>Supplier:</strong> {product?.supplier}</p>

            <p><strong>Price:</strong> ₦{product?.price?.toLocaleString()}</p>

            <p><strong>Quantity:</strong> {product?.quantity}</p>

            <p><strong>SKU:</strong> {product?.sku}</p>

            <p><strong>Threshold:</strong> {product?.threshold ?? "Not Set"}</p>

            <p>
              <strong>Status:</strong>{" "}
              {product?.isActive ? "Active" : "Inactive"}
            </p>
          </>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}