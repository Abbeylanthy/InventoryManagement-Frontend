import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  type CreateUserRequest,
} from "../services/createUserService";

export const useCreateUser = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (data: CreateUserRequest) =>
      createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

  });

};