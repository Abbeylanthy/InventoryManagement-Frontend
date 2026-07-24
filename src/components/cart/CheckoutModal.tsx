import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/useCheckout";

interface Props {
  open: boolean;
  onClose: () => void;
  cartId: number | null;
}

export default function CheckoutModal({
  open,
  onClose,
  cartId,
}: Props) {
  const navigate = useNavigate();

  const checkoutMutation = useCheckout();

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [notes, setNotes] = useState("");

  if (!open) return null;

  const handleCheckout = async () => {
    console.log("Checkout clicked");
    console.log("cartId:", cartId);
    if (!cartId) {
      toast.error("Cart ID is misssing");
      return;
    }
    if (!shippingAddress.trim()) {
      toast.warning("Shipping address is required.");
      return;
    }

    try {
      const result =
        await checkoutMutation.mutateAsync({
          cartId,
          shippingAddress,
          notes,
        });

      toast.success(result.message);

      onClose();

      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Checkout
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Shipping Address
            </label>

            <textarea
              rows={3}
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Notes
            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleCheckout}
            disabled={checkoutMutation.isPending}
            className="px-5 py-2 rounded bg-blue-600 text-white"
          >
            {checkoutMutation.isPending
              ? "Processing..."
              : "Complete Checkout"}
          </button>

        </div>

      </div>

    </div>
  );
}