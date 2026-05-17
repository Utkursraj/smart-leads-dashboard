import { api } from "./api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};