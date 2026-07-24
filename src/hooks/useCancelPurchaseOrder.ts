import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelPurchaseOrder } from "../services/purchaseOrderService";

export const useCancelPurchaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelPurchaseOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
};