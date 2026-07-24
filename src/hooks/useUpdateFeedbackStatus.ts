import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedbackStatus } from "../services/feedbackService";
import axios from "axios";

export const useUpdateFeedbackStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: string;
    }) => updateFeedbackStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedback"],
      });

      alert("Feedback status updated successfully.");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data ?? "Something went wrong.");
      } else {
        alert("Something went wrong.");
      }
    },
  });
};