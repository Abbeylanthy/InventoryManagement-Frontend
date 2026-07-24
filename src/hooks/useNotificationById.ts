import { useQuery } from "@tanstack/react-query";
import { getNotificationById } from "../services/getNotificationByIdService";

export const useNotificationById = (
  id: number | null
) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () => getNotificationById(id!),
    enabled: id !== null,
  });
};