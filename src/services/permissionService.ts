import api from "../api/axios";
import type { PaginatedPermissions } from "../types/permission";
import type { PermissionDetails } from "../types/permission";

export const getPermissions = async (
  page = 1,
  search = ""
): Promise<PaginatedPermissions> => {
  const response = await api.get("/Permission", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
    },
  });

  return response.data;
};

export const getPermissionById = async (
  id: number
): Promise<PermissionDetails> => {
  const response = await api.get(`/Permission/${id}`);

  return response.data;
};

export const createPermission = async (
  name: string
) => {
  const response = await api.post("/Permission", {
    name,
  });

  return response.data;
};

export const updatePermission = async (
  id: number,
  name: string
) => {
  const response = await api.put(`/Permission/${id}`, {
    name,
  });

  return response.data;
};

export const togglePermissionStatus = async (
  id: number
) => {
  const permission = await getPermissionById(id);

  if (permission.isActive) {
    await api.put(`/Permission/deactivate/${id}`);
  } else {
    await api.put(`/Permission/activate/${id}`);
  }
};

export const assignPermissionToRoles = async (
  permissionId: number,
  roleIds: number[]
) => {
  const response = await api.post(
    "/Permission/assign-to-roles",
    {
      permissionId,
      roleIds,
    }
  );

  return response.data;
};

export const removePermissionFromRoles = async (
  permissionId: number,
  roleIds: number[]
) => {
  const response = await api.post(
    "/Permission/remove-from-roles",
    {
      permissionId,
      roleIds,
    }
  );

  return response.data;
};