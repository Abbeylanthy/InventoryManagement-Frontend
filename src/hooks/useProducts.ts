import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/productService";

export const useProducts = (
  page: number = 1,
  search: string = ""
) => {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts(page, search),
  });
};