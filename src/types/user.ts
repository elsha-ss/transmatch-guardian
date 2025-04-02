
export type UserRole = 
  | "Administrator" 
  | "Executive" 
  | "Manager" 
  | "Specialist" 
  | "Analyst";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Inactive";
  cases?: UserCase[];
}

export interface UserCase {
  id: number;
  title: string;
  status: "Open" | "In Progress" | "Closed";
  assignedDate: string;
  closedDate?: string;
}

export interface RolePermission {
  role: UserRole;
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    import: boolean;
    export: boolean;
    assignTasks: boolean;
    reviewAlerts: boolean;
    handleCases: boolean;
  };
}
