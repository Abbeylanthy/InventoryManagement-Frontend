import { useQuery } from "@tanstack/react-query";

import { getOrderDetails } from "../services/orderDetailsService";

export const useOrderDetails = (
  id: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["order-details", id],

    queryFn: () => getOrderDetails(id),

    enabled,
  });
};