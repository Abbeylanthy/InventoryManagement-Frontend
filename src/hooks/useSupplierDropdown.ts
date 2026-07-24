import { useQuery } from "@tanstack/react-query";
import { getSupplierDropdown } from "../services/supplierService";

export const useSupplierDropdown = () => {
  return useQuery({
    queryKey: ["supplier-dropdown"],
    queryFn: getSupplierDropdown,
  });
};