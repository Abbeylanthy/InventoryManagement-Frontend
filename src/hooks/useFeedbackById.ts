import { useQuery } from "@tanstack/react-query";
import { getFeedbackById } from "../services/feedbackService";

export const useFeedbackById = (
  feedbackId: number | null
) => {
  return useQuery({
    queryKey: ["feedback", feedbackId],
    queryFn: () => getFeedbackById(feedbackId!),
    enabled: feedbackId !== null,
  });
};