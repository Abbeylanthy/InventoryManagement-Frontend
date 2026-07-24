import type { Product } from "../../types/product";
import ProductForm from "./ProductForm";


interface Props {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function AddProductModal({
  open,
  onClose,
  product,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <ProductForm
  product={product}
  onClose={onClose}
/>

      </div>
    </div>
  );
}