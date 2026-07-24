import { useMutation } from "@tanstack/react-query";
import { initializePayment } from "../services/initializePaymentService";

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: (orderId: number) =>
      initializePayment(orderId),
  });
};