import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeRoleFromUsers } from "../services/roleService";

export const useRemoveRoleFromUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      userIds,
    }: {
      roleId: number;
      userIds: number[];
    }) => removeRoleFromUsers(roleId, userIds),

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