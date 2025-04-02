
import { RolePermission, UserRole } from "@/types/user";

export const rolePermissions: Record<UserRole, RolePermission['permissions']> = {
  "Administrator": {
    create: true,
    read: true,
    update: true,
    delete: true,
    import: true,
    export: true,
    assignTasks: true,
    reviewAlerts: true,
    handleCases: true,
  },
  "Executive": {
    create: false,
    read: true,
    update: false,
    delete: false,
    import: false,
    export: true,
    assignTasks: false,
    reviewAlerts: false,
    handleCases: false,
  },
  "Manager": {
    create: false,
    read: true,
    update: true,
    delete: false,
    import: true,
    export: true,
    assignTasks: true,
    reviewAlerts: true,
    handleCases: false,
  },
  "Specialist": {
    create: false,
    read: true,
    update: false,
    delete: false,
    import: true,
    export: true,
    assignTasks: false,
    reviewAlerts: true,
    handleCases: false,
  },
  "Analyst": {
    create: false,
    read: true,
    update: true,
    delete: false,
    import: false,
    export: true,
    assignTasks: false,
    reviewAlerts: false,
    handleCases: true,
  },
};

export const checkPermission = (
  role: UserRole,
  permission: keyof RolePermission['permissions']
): boolean => {
  return rolePermissions[role][permission];
};

export const isValidEmail = (email: string): boolean => {
  return email.endsWith("@trialcorp.com");
};

export const isAdmin = (email: string): boolean => {
  return email === "admin1@trialcorp.com";
};
