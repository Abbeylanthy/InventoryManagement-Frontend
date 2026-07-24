import { useQuery } from "@tanstack/react-query";
import { getRevenueTrend } from "../services/orderService";

export const useRevenueTrend = () => {
  return useQuery({
    queryKey: ["revenue-trend"],
    queryFn: getRevenueTrend,
  });
};