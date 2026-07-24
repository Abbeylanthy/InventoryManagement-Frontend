import api from "../api/axios";
import type { PaginatedNotifications } from "../types/notification";

export const getUnreadNotificationCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await api.put("/notifications/read-all");
  return response.data;
};

export const getMyNotifications = async (
  page = 1,
  search = ""
): Promise<PaginatedNotifications> => {
  const response = await api.get("/notifications", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
    },
  });

  return response.data;
};

export const getAllNotifications = async (
  page = 1,
  search = "",
  isRead?: boolean
): Promise<PaginatedNotifications> => {
  const response = await api.get("/notifications/all", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      isRead,
    },
  });

  return response.data;
};