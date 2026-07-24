import { useQuery } from "@tanstack/react-query";
import {
  getAllCarts,
  getCartById,
} from "../services/cartService";

export const useCarts = (
    page = 1
) => {
  return useQuery({
    queryKey: ["carts", page],
    queryFn: () => getAllCarts(page),
  });
};

export const useCartDetails = (
  cartId: number | null
) => {
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCartById(cartId!),
    enabled: !!cartId,
  });
};