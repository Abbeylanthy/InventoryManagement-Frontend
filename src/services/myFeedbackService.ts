import api from "../api/axios";
import type { PaginatedFeedback } from "../types/feedback";

export const getMyFeedback = async (
  page = 1,
  search = "",
  status?: string
): Promise<PaginatedFeedback> => {
  const response = await api.get("/feedback/my", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
    },
  });

  return response.data;
};