export type Role = "viewer" | "admin";

export interface RoleConfig {
  label: string;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
}
