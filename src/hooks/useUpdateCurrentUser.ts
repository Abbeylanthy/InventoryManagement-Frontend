import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../services/userService";

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: number;
      dto: any;
    }) => updateCurrentUser(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
};