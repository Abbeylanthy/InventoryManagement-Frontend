import { useQuery } from "@tanstack/react-query";
import { getAllFeedback } from "../services/feedbackService";

export const useAllFeedback = (
  page = 1,
  search = "",
  status?: string,
  rating?: number
) => {
  return useQuery({
    queryKey: [
      "feedback",
      page,
      search,
      status,
      rating,
    ],
    queryFn: () =>
      getAllFeedback(
        page,
        search,
        status,
        rating
      ),
  });
};