export interface Role {
  id: number;
  name: string;
  isActive: boolean;
}

export interface PermissionMin {
  id: number;
  name: string;
}

export interface RoleDetails {
  id: number;
  name: string;
  isActive: boolean;
  permissions: PermissionMin[];
}

export interface PaginatedRoles {
  items: Role[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}