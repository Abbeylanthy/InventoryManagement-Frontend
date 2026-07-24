import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../services/roleService";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
    }: {
      id: number;
      name: string;
    }) => updateRole(id, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};