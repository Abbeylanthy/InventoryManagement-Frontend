import { useQuery } from "@tanstack/react-query";
import { getProductDropdown } from "../services/productService";

export const useProductDropdown = () => {
  return useQuery({
    queryKey: ["product-dropdown"],
    queryFn: getProductDropdown,
  });
};