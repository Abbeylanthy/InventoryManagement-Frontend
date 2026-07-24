import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePermissionFromRoles } from "../services/permissionService";

export const useRemovePermissionFromRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      permissionId,
      roleIds,
    }: {
      permissionId: number;
      roleIds: number[];
    }) =>
      removePermissionFromRoles(
        permissionId,
        roleIds
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};