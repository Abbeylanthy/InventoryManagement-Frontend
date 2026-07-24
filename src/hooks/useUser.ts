import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/getUserByIdService";

export const useUser = (
  id: number | null
) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};