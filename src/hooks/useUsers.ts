import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

export const useUsers = (
  page = 1,
  search = "",
  pageSize = 10
) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => getUsers(page, search, pageSize),
  });
};