import api from "../api/axios";
import type { PaginatedPayments } from "../types/payment";

export const getPayments = async (
  page = 1,
  search = "",
  status = ""
): Promise<PaginatedPayments> => {
  const response = await api.get("/payments", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
    },
  });

  return response.data;
};