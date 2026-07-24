import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/myOrderService";

export const useMyOrders = (
  page = 1,
  search = "",
  status = ""
) => {
  return useQuery({
    queryKey: [
      "my-orders",
      page,
      search,
      status,
    ],
    queryFn: () =>
      getMyOrders(
        page,
        search,
        status
      ),
  });
};