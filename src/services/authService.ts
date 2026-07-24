import api from "../api/axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth";

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (
  dto: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    dto
  );

  return response.data;
};

export const verifyOtp = async (
  email: string,
  otp: string
) => {
  const response = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

export const resendOtp = async (
  email: string
) => {
  const response = await api.post(
    "/auth/resend-otp",
    {
      email,
    }
  );

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      newPassword,
    }
  );

  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await api.post(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    }
  );

  return response.data;
};