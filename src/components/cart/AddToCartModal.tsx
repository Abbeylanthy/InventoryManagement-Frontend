import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useAddToCart } from "../../hooks/useCartMutations";

interface Props {
  open: boolean;
  onClose: () => void;
  productId: number | null;
  productName: string;
}

export default function AddToCartModal({
  open,
  onClose,
  productId,
  productName,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const addToCartMutation = useAddToCart();

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  if (!open) return null;

  const handleAdd = async () => {
    if (!productId) return;

    try {
      await addToCartMutation.mutateAsync({
        productId,
        quantity,
      });

      toast.success("Item added to cart.");

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add To Cart
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <p className="font-semibold mb-6">
          {productName}
        </p>

        <label className="block mb-2 font-medium">
          Quantity
        </label>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setQuantity((q) => Math.max(1, q - 1))
            }
            className="bg-gray-200 px-4 py-2 rounded"
          >
            -
          </button>

          <span className="text-xl font-bold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity((q) => q + 1)
            }
            className="bg-gray-200 px-4 py-2 rounded"
          >
            +
          </button>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={addToCartMutation.isPending}
            className="px-5 py-2 rounded bg-blue-600 text-white"
          >
            {addToCartMutation.isPending
              ? "Adding..."
              : "Add To Cart"}
          </button>

        </div>

      </div>

    </div>
  );
}