import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserStatus } from "../services/toggleUserStatusService";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};