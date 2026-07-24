import api from "../api/axios";

export const toggleRoleStatus = async (id: number) => {
  const response = await api.put(`/Role/toggle-status/${id}`);

  return response.data;
};