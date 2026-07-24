import api from "../api/axios";
import type { UserDetails } from "../types/user";

export const getUserById = async (
  id: number
): Promise<UserDetails> => {
  const response = await api.get(`/User/${id}`);

  return response.data;
};