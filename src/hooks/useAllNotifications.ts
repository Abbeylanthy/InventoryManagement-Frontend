import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../services/notificationService";

export const useAllNotifications = (
  page = 1,
  search = "",
  isRead?: boolean
) => {
  return useQuery({
    queryKey: ["all-notifications", page, search, isRead],
    queryFn: () =>
      getAllNotifications(page, search, isRead),
  });
};