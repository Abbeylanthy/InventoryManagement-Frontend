import api from "../api/axios";
import type { PaginatedUsersResponse, UserUpdateDto } from "../types/user";

export const getUsers = async (
  pageNumber = 1,
  search = "",
  pageSize = 10
): Promise<PaginatedUsersResponse> => {

  const response = await api.get("/User", {
    params: {
      pageNumber,
      pageSize,
      search,
    },
  });

  return response.data;
};

export const updateUser = async (
  id: number,
  data: UserUpdateDto
) => {
  const response = await api.put(
    `/User/${id}`,
    data
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/User/me");
  return data;
};

export const updateCurrentUser = async (
  id: number,
  dto: UserUpdateDto
) => {
  const { data } = await api.put(`/User/${id}`, dto);
  return data;
};