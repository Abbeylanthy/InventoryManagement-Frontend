import api from "../api/axios";
import type { PaginatedOrders } from "../types/order";

export const getOrders = async (
  page = 1,
  search = "",
  status = ""
): Promise<PaginatedOrders> => {
  const response = await api.get("/orders", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
    },
  });

  return response.data;
};

export const getStaffDashboardSummary = async () => {
  const response = await api.get("/orders/staff-dashboard-summary");
  return response.data;
};

export const getRecentOrders = async () => {
  const response = await api.get("/orders/recent-orders");
  return response.data;
};

export const getRevenueTrend = async () => {
  const response = await api.get("/orders/revenue-trend");
  return response.data;
};