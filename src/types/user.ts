
export type UserRole = 
  | "Administrator" 
  | "Executive" 
  | "Manager" 
  | "Specialist" 
  | "Analyst";

export interface User {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
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
  assignedTo?: string;
  closedDate?: string;
  resolvedBy?: string;
  resolution?: string;
  escalatedTo?: string;
  escalatedDate?: string;
  escalationReason?: string;
  reportedToAuthorities?: boolean;
  reportedTo?: string;
  reportedDate?: string;
  referenceNumber?: string;
  contactedPerson?: string;
  comments?: string;
  actionsTaken?: string;
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
