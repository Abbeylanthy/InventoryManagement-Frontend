import api from "../api/axios";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  password: string;
  roleIds: number[];
}

export const createUser = async (
  data: CreateUserRequest
) => {
  const response = await api.post(
    "/User/create",
    data
  );

  return response.data;
};