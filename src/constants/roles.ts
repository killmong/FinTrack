import type { Role, RoleConfig } from "../types/role.types";

export const ROLES: Record<Role, RoleConfig> = {
  viewer: {
    label: "Viewer",
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canExport: false,
  },
  admin: {
    label: "Admin",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
  },
};

export const ROLE_OPTIONS: Role[] = ["viewer", "admin"];
