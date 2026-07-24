import api from "../api/axios";

export const toggleUserStatus = async (id: number) => {
  const response = await api.put(`/User/toggle-status/${id}`);

  return response.data;
};