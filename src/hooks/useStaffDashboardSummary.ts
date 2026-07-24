import { useQuery } from "@tanstack/react-query";
import { getStaffDashboardSummary } from "../services/orderService";

export const useStaffDashboardSummary = () => {
  return useQuery({
    queryKey: ["staff-dashboard-summary"],
    queryFn: getStaffDashboardSummary,
  });
};