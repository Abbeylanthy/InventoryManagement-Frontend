export interface Permission {
  id: number;
  name: string;
  isActive: boolean;
}

export interface PaginatedPermissions {
  items: Permission[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface RoleMin {
  id: number;
  name: string;
}

export interface PermissionDetails {
  id: number;
  name: string;
  isActive: boolean;
  roles: RoleMin[];
}