import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../services/notificationService";

export const useNotifications = (
  page = 1,
  search = ""
) => {
  return useQuery({
    queryKey: ["notifications", page, search],
    queryFn: () =>
      getMyNotifications(page, search),
  });
};

