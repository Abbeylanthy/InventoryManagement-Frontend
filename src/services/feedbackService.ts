import api from "../api/axios";
import type { PaginatedFeedback } from "../types/feedback";

export const getAllFeedback = async (
  page = 1,
  search = "",
  status?: string,
  rating?: number
): Promise<PaginatedFeedback> => {
  const response = await api.get("/feedback", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
      rating,
    },
  });

  return response.data;
};

export const getFeedbackById = async (id: number) => {
  const response = await api.get(`/feedback/${id}`);
  return response.data;
};

export const updateFeedbackStatus = async (
  id: number,
  status: string
) => {
  const response = await api.put(
    `/feedback/${id}/status`,
    null,
    {
      params: { status },
    }
  );

  return response.data;
};

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