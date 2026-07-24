import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFeedback,
  type CreateFeedbackRequest,
} from "../services/createFeedbackService";

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateFeedbackRequest) =>
      createFeedback(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-feedback"],
      });

      queryClient.invalidateQueries({
        queryKey: ["feedback"],
      });
    },
  });
};