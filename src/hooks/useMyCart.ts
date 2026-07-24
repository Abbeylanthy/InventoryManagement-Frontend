import { useQuery } from "@tanstack/react-query";
import { getMyCart } from "../services/cartService";

export const useMyCart = () => {
  return useQuery({
    queryKey: ["my-cart"],
    queryFn: getMyCart,
  });
};