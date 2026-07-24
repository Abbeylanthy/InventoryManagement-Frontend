import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMyCart } from "../../hooks/useMyCart";
import {
  useUpdateMyCart,
  useRemoveMyCartItem,
  useClearMyCart,
} from "../../hooks/useMyCartMutations";

import CheckoutModal from "../../components/cart/CheckoutModal";

import type { CartItemResponseDto } from "../../types/cart";

export default function MyCart() {
  const { data, isLoading, isError } = useMyCart();

  const queryClient = useQueryClient();

  const updateCartMutation = useUpdateMyCart();
  const removeCartMutation = useRemoveMyCartItem();
  const clearCartMutation = useClearMyCart();

  const [openCheckout, setOpenCheckout] = useState(false);

  const updateQuantity = async (
    productId: number,
    quantity: number
  ) => {
    if (quantity < 1) return;

    try {
      await updateCartMutation.mutateAsync({
        productId,
        quantity,
      });

      queryClient.invalidateQueries({
        queryKey: ["my-cart"],
      });
    } catch {
      toast.error("Failed to update cart.");
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await removeCartMutation.mutateAsync(productId);
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  const handleClearCart = async () => {
   await
   clearCartMutation.mutateAsync();

   toast.success("Cart cleared successfully");

    try {
      await clearCartMutation.mutateAsync();
    } catch {
      toast.error("Failed to clear cart.");
    }
  };

  if (isLoading) return <p>Loading cart...</p>;

  if (isError) return <p>Failed to load cart.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Cart
      </h1>

      {!data?.items?.length ? (
        <div className="text-center py-12 text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Product</th>
                <th className="border p-3">Quantity</th>
                <th className="border p-3">Unit Price</th>
                <th className="border p-3">Total</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.items.map((item: CartItemResponseDto) => (
                <tr key={item.id}>
                  <td className="border p-3">
                    {item.productName}
                  </td>

                  <td className="border p-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={updateCartMutation.isPending}
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        className="bg-gray-200 px-3 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        disabled={updateCartMutation.isPending}
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="bg-gray-200 px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="border p-3">
                    ₦{item.unitPrice.toLocaleString()}
                  </td>

                  <td className="border p-3">
                    ₦{item.totalPrice.toLocaleString()}
                  </td>

                  <td className="border p-3">
                    <button
                      disabled={removeCartMutation.isPending}
                      onClick={() =>
                        removeItem(item.productId)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">
              Grand Total:
              <span className="ml-2 text-blue-600">
                ₦{data.grandTotal.toLocaleString()}
              </span>
            </h3>

            <div className="flex gap-3">
              <button
                onClick={handleClearCart}
                disabled={
                  clearCartMutation.isPending ||
                  !data.items.length
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                {clearCartMutation.isPending
                  ? "Clearing..."
                  : "Clear Cart"}
              </button>

              <button
                onClick={() =>
                  setOpenCheckout(true)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>

          <CheckoutModal
            open={openCheckout}
            onClose={() =>
              setOpenCheckout(false)
            }
            cartId={data?.cartId ?? null}
          />
        </>
      )}
    </div>
  );
}