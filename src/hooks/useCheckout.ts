import { useMutation } from "@tanstack/react-query";
import { checkout } from "../services/checkoutService";

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkout,
  });
};