import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPermission } from "../services/permissionService";

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {name: string }) => createPermission(data.name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};