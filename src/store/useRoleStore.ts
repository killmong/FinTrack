import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "../types/role.types";

interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: "viewer",
      setRole: (role) => set({ role }),
    }),
    {
      name: "role-store",
    },
  ),
);
