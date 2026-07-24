import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllNotificationsRead } from "../services/notificationService";

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    },
  });
};