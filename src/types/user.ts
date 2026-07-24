export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
}

export interface User {
  id: number;
  userName: string;
  isActive: boolean;
  emailVerified: boolean;
  roles: Role[];
}

export interface PaginatedUsersResponse {
  items: User[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface UserUpdateDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  isActive: boolean;
  emailVerified: boolean;
  roles: Role[];
}