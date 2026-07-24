import api from "../api/axios";

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

export const updateUser = async (
  id: number,
  data: UpdateUserRequest
) => {
  const response = await api.put(`/User/${id}`, data);

  return response.data;
};