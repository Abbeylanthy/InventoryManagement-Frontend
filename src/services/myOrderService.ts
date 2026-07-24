import api from "../api/axios";
import type { PaginatedOrders } from "../types/order";

export const getMyOrders = async (
  page = 1,
  search = "",
  status = ""
): Promise<PaginatedOrders> => {
  const response = await api.get("/orders/my-orders", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
    },
  });

  return response.data;
};