import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receivePurchaseOrder } from "../services/purchaseOrderService";

export const useReceivePurchaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      items,
    }: {
      id: number;
     items: {
  productId: number;
  quantityReceived: number;
}[];
    }) => receivePurchaseOrder(id, items),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stockHistory"],
      });
    },
  });
};