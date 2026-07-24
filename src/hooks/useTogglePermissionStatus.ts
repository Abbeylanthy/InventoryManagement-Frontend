import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePermissionStatus } from "../services/permissionService";

export const useTogglePermissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => togglePermissionStatus(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};