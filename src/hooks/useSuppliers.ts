import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../services/supplierService";

export const useSuppliers = (
  page: number = 1,
  search: string = ""
) => {
  return useQuery({
    queryKey: ["suppliers", page, search],
    queryFn: () => getSuppliers(page, search),
  });
};