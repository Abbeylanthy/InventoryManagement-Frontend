import api from "../api/axios";
import type { PaginatedStockHistory } from "../types/stockHistory";

export const getStockHistory = async (
  page = 1,
  search = "",
  actionType = ""
): Promise<PaginatedStockHistory> => {
  const response = await api.get("/stock/history", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      actionType,
    },
  });

  return response.data;
};

export const getProductStockHistory = async (
  productId: number,
  page = 1
): Promise<PaginatedStockHistory> => {
  const response = await api.get(
    `/stock/history/${productId}`,
    {
      params: {
        pageNumber: page,
        pageSize: 10,
      },
    }
  );

  return response.data;
};

