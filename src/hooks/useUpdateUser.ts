import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUser,
  type UpdateUserRequest,
} from "../services/updateUserService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateUserRequest;
    }) => updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};