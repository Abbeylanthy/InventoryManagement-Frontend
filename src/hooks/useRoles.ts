import { useQuery } from "@tanstack/react-query";
import { getRoleById, getRoles } from "../services/roleService";

export const useRoles = (
  page = 1,
  search = ""
) => {
  return useQuery({
    queryKey: ["roles", page, search],
    queryFn: () => getRoles(page, search),
  });
};

export const useRole = (id: number | null) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleById(id!),
    enabled: !!id,
  });
};