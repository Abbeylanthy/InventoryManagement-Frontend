import api from "../api/axios";
import type { Notification } from "../types/notification";

export const getNotificationById = async (
  id: number
): Promise<Notification> => {
  const response = await api.get(`/notifications/${id}`);

  return response.data;
};