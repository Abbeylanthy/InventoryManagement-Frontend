import { useQuery } from "@tanstack/react-query";
import { getMyFeedback } from "../services/feedbackService";

export const useMyFeedback = (
  page = 1,
  search = "",
  status?: string
) => {
  return useQuery({
    queryKey: [
      "my-feedback",
      page,
      search,
      status,
    ],
    queryFn: () =>
      getMyFeedback(
        page,
        search,
        status
      ),
  });
};