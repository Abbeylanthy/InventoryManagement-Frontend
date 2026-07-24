import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignRoleToUsers } from "../services/roleService";

export const useAssignRoleToUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      userIds,
    }: {
      roleId: number;
      userIds: number[];
    }) => assignRoleToUsers(roleId, userIds),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};