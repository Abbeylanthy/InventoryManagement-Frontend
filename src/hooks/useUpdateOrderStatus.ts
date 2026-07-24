import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../services/updateOrderStatusService";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: number;
      status: string;
    }) =>
      updateOrderStatus(orderId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};