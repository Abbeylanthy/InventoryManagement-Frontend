import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryService";

export const useCategories = (
  page: number = 1,
  search: string = "",
  isActive?: boolean
) => {
  return useQuery({
    queryKey: ["categories", page, search, isActive],
    queryFn: () => getCategories(page, search, isActive),
  });
};