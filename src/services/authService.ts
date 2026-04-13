import api from "./api";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.types";

export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<User> => {
  const res = await api.post("/auth/register", credentials);
  return res.data;
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<User> => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data;
};
