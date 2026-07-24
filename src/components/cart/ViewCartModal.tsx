import { X } from "lucide-react";
import { useCartDetails } from "../../hooks/useCarts";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateCart, useRemoveCartItem, } from "../../hooks/useCartMutations";
import CheckoutModal from "./CheckoutModal";
import { useClearCart } from "../../hooks/useCartMutations";



interface Props {
  open: boolean;
  onClose: () => void;
  cartId: number | null;
  editable?: boolean;
}

export default function ViewCartModal({
  open,
  onClose,
  cartId,
  editable = false,
}: Props) {
  const { data, isLoading, isError } =
    useCartDetails(cartId);

    const queryClient = useQueryClient();

    const updateCartMutation = useUpdateCart(cartId);

    const removeCartMutation = useRemoveCartItem(cartId);

    const clearCartMutation = useClearCart(cartId);

    const [openCheckout, setOpenCheckout] = useState(false);

  if (!open) return null;

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
      queryKey: ["cartDetails", cartId],
    });

    queryClient.invalidateQueries({
      queryKey: ["carts"],
    });

  } catch (error) {
    console.error(error);
    alert("Failed to update cart.");
  }
};

const removeItem = async (
  productId: number
) => {
  try {
    await removeCartMutation.mutateAsync(
      productId
    );
  } catch (error) {
    console.error(error);
    alert("Failed to remove item.");
  }
};

const handleClearCart = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear this cart?"
  );

  if (!confirmed) return;

  try {
    await clearCartMutation.mutateAsync();
  } catch (error) {
    console.error(error);
    alert("Failed to clear cart.");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col">

       <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Customer Cart
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>
<div className="flex-1 overflow-y-auto p-6">

</div>
        {isLoading ? (

          <div className="text-center py-10">
            Loading...
          </div>

        ) : isError ? (

          <div className="text-center py-10 text-red-600">
            Failed to load cart.
          </div>

        ) : (

          <>

            <div className="grid grid-cols-2 gap-6 mb-8">

              <div>

                <p className="text-gray-500 text-sm">
                  Customer
                </p>

                <p className="font-semibold">
                  {data?.customerName}
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-semibold">
                  {data?.customerEmail}
                </p>

              </div>

              

            </div>

            

            <table className="w-full border">

              <thead className="bg-gray-100">

                <tr>

                  <th className="border p-3">
                    Product
                  </th>

                  <th className="border p-3">
                    Quantity
                  </th>

                  <th className="border p-3">
                    Unit Price
                  </th>

                  <th className="border p-3">
                    Total
                  </th>

                  {editable && (
                  <th className="border p-3">
                    Action
                  </th>
                  )}

                </tr>

              </thead>

              <tbody>

                {data?.items.map((item) => (

                  <tr key={item.id}>

                    <td className="border p-3">
                      {item.productName}
                    </td>

                   <td className="border p-3">

 {editable ? (
  <div className="flex items-center justify-center gap-3">

    <button
      disabled={updateCartMutation.isPending}
      onClick={() =>
        updateQuantity(
          item.productId,
          item.quantity - 1
        )
      }
      className="bg-gray-200 px-3 rounded disabled:opacity-50"
    >
      -
    </button>

    <span className="font-semibold">
      {item.quantity}
    </span>

    <button
      disabled={updateCartMutation.isPending}
      onClick={() =>
        updateQuantity(
          item.productId,
          item.quantity + 1
        )
      }
      className="bg-gray-200 px-3 rounded disabled:opacity-50"
    >
      +
    </button>

  </div>
) : (
  <span className="font-semibold">
    {item.quantity}
  </span>
)}

</td>

                    <td className="border p-3">
                      ₦{item.unitPrice.toLocaleString()}
                    </td>

                   <td className="border p-3">
  ₦{item.totalPrice.toLocaleString()}
</td>

{editable && (
  <td className="border p-3">

    <button
      disabled={removeCartMutation.isPending}
      onClick={() =>
        removeItem(item.productId)
      }
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded disabled:opacity-50"
    >
      Remove
    </button>

  </td>
)}

                  </tr>

                ))}

              </tbody>

            </table>

           <div className="flex justify-between items-center mt-6 sticky bottom-0 bg-white pt-4 border-t">

  <h3 className="text-xl font-bold">

    Grand Total:

    <span className="ml-2 text-blue-600">
      ₦{data?.grandTotal.toLocaleString()}
    </span>

  </h3>
  {editable && (
  <>
    <button
      onClick={handleClearCart}
      disabled={
        clearCartMutation.isPending ||
        !data?.items.length
      }
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {clearCartMutation.isPending
        ? "Clearing..."
        : "Clear Cart"}
    </button>

    <button
      onClick={() => {
        if (!data || data.items.length === 0) {
          alert(
            "This cart is empty. Add at least one item before checking out."
          );
          return;
        }

        setOpenCheckout(true);
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
    >
      Checkout
    </button>
  </>
)}


</div>

          </>

        )}

      </div>

      {editable && (
      <CheckoutModal
  open={openCheckout}
  onClose={() => setOpenCheckout(false)}
  cartId={cartId}
/>
      )}

    </div>
  );
}