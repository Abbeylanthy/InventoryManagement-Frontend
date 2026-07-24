import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../services/markNotificationReadService";

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      markNotificationRead(notificationId),

   onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["notifications"],
  });

  queryClient.invalidateQueries({
    queryKey: ["all-notifications"],
  });

  queryClient.invalidateQueries({
    queryKey: ["notification-count"],
  });
},
  });
};