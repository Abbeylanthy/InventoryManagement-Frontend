import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderService";

export const useOrders = (
  page = 1,
  search = "",
  status = ""
) => {
  return useQuery({
    queryKey: [
      "orders",
      page,
      search,
      status,
    ],

    queryFn: () =>
      getOrders(
        page,
        search,
        status
      ),
  });
};