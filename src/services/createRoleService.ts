import api from "../api/axios";

interface CreateRoleDto {
  name: string;
}

export const createRole = async (data: CreateRoleDto) => {
  const response = await api.post("/Role", data);

  return response.data;
};