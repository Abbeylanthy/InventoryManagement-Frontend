import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePurchaseOrder } from "../services/purchaseOrderService";

export const useApprovePurchaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approvePurchaseOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
};