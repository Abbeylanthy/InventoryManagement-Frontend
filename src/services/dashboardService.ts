import api from "../api/axios";
import type { DashboardSummary } from "../types/dashboard";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<DashboardSummary>(
    "/orders/dashboard-summary"
  );

  return response.data;
};