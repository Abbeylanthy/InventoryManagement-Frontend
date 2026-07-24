import api from "../api/axios";

export const markNotificationRead = async (
  notificationId: number
) => {
  const response = await api.put(
    `/notifications/read/${notificationId}`
  );

  return response.data;
};