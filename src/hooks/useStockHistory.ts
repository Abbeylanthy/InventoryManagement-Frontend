import { useQuery } from "@tanstack/react-query";
import { getStockHistory, getProductStockHistory } from "../services/stockHistoryService";

export const useStockHistory = (
  page = 1,
  search = "",
  actionType = ""
) => {
  return useQuery({
    queryKey: [
      "stockHistory",
      page,
      search,
      actionType,
    ],

    queryFn: () =>
      getStockHistory(
        page,
        search,
        actionType
      ),
  });
};

export const useProductStockHistory = (
  productId: number | null,
  page = 1
) => {
  return useQuery({
    queryKey: ["productStockHistory", productId, page],

    queryFn: () =>
      getProductStockHistory(productId!, page),

    enabled: !!productId,
  });
};