import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePermission } from "../services/permissionService";

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
    }: {
      id: number;
      name: string;
    }) => updatePermission(id, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};