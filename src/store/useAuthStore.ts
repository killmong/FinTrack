import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth.types";
import { loginUser, registerUser } from "../services/authService";

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const user = await loginUser(credentials);
          localStorage.setItem("token", user.token);
          set({ user, token: user.token, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
          });
        }
      },

      register: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const user = await registerUser(credentials);
          localStorage.setItem("token", user.token);
          set({ user, token: user.token, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Registration failed",
            loading: false,
          });
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
