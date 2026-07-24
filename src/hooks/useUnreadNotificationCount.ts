import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "../services/notificationService";

export const useUnreadNotificationCount = () =>
  useQuery({
    queryKey: ["notification-count"],
    queryFn: getUnreadNotificationCount,
  });