import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignPermissionToRoles } from "../services/permissionService";

export const useAssignPermissionToRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      permissionId,
      roleIds,
    }: {
      permissionId: number;
      roleIds: number[];
    }) =>
      assignPermissionToRoles(
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