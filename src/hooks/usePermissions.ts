import { useQuery } from "@tanstack/react-query";
import {
  getPermissionById,
  getPermissions,
} from "../services/permissionService";

export const usePermissions = (
  page = 1,
  search = ""
) => {
  return useQuery({
    queryKey: ["permissions", page, search],
    queryFn: () => getPermissions(page, search),
  });
};

export const usePermission = (
  id: number | null
) => {
  return useQuery({
    queryKey: ["permission", id],
    queryFn: () => getPermissionById(id!),
    enabled: !!id,
  });
};