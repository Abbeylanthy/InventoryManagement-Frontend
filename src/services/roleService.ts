import api from "../api/axios";
import type { PaginatedRoles } from "../types/role";
import type { RoleDetails } from "../types/role";

export const getRoles = async (
  page = 1,
  search = ""
): Promise<PaginatedRoles> => {
  const response = await api.get("/Role", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
    },
  });

  return response.data;
};

export const getRoleById = async (
  id: number
): Promise<RoleDetails> => {
  const response = await api.get(`/Role/${id}`);

  return response.data;
};

export const updateRole = async (
  id: number,
  name: string
) => {
  const response = await api.put(`/Role/${id}`, {
    name,
  });

  return response.data;
};

export const assignRoleToUsers = async (
  roleId: number,
  userIds: number[]
) => {
  const response = await api.post(
    "/Role/assign-role-to-users",
    {
      roleId,
      userIds,
    }
  );

  return response.data;
};

export const removeRoleFromUsers = async (
  roleId: number,
  userIds: number[]
) => {
  const response = await api.post(
    "/Role/remove-role",
    {
      roleId,
      userIds,
    }
  );

  return response.data;
};