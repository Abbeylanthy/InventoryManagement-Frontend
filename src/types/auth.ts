export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  isActive: boolean;
  permissions: Permission[];
}

export interface User {
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}