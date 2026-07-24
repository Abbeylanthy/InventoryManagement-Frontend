import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchaseOrder } from "../services/purchaseOrderService";

export const useCreatePurchaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchaseOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
};