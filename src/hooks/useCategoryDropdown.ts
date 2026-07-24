import { useQuery } from "@tanstack/react-query";
import { getCategoryDropdown } from "../services/categoryService";
export const useCategoryDropdown = () => {
  return useQuery({
    queryKey: ["category-dropdown"],
    queryFn: getCategoryDropdown,
  });
};