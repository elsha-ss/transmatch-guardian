
import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserCase, UserRole } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import { isValidEmail } from "@/utils/rolePermissions";

// Mock data to start with
const mockCases: UserCase[] = [
  { id: 1, title: "Suspicious Transaction #4392", status: "Open", assignedDate: "2023-06-15" },
  { id: 2, title: "Account Verification #1205", status: "In Progress", assignedDate: "2023-06-10" },
  { id: 3, title: "Potential Fraud Alert #7823", status: "Closed", assignedDate: "2023-05-28", closedDate: "2023-06-05" },
  { id: 4, title: "Missing Documentation #9443", status: "Open", assignedDate: "2023-06-18" },
  { id: 5, title: "Compliance Review #3356", status: "In Progress", assignedDate: "2023-06-12" },
];

const mockUsers: User[] = [
  { id: 1, name: "Admin User", email: "admin1@trialcorp.com", role: "Administrator", status: "Active" },
  { id: 2, name: "John Smith", email: "john@trialcorp.com", role: "Analyst", status: "Active", cases: [mockCases[0], mockCases[2]] },
  { id: 3, name: "Emma Wilson", email: "emma@trialcorp.com", role: "Specialist", status: "Active" },
  { id: 4, name: "Michael Brown", email: "michael@trialcorp.com", role: "Manager", status: "Inactive" },
  { id: 5, name: "Sarah Davis", email: "sarah@trialcorp.com", role: "Executive", status: "Active" },
];

interface UserContextType {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  toggleUserStatus: (userId: number) => void;
  getUserCases: (userId: number) => UserCase[];
}

const UserContext = createContext<UserContextType>({
  users: [],
  currentUser: null,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  toggleUserStatus: () => {},
  getUserCases: () => [],
});

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  // For demo purposes, set the admin as the current user
  const [currentUser] = useState<User | null>(mockUsers.find(user => user.email === "admin1@trialcorp.com") || null);

  const addUser = (userData: Omit<User, "id">) => {
    if (!isValidEmail(userData.email)) {
      toast({
        title: "Invalid Email",
        description: "Only emails ending with @trialcorp.com are allowed.",
        variant: "destructive"
      });
      return;
    }

    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      toast({
        title: "User Already Exists",
        description: `A user with email ${userData.email} already exists.`,
        variant: "destructive"
      });
      return;
    }

    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1
    };

    setUsers(prev => [...prev, newUser]);
    toast({
      title: "User Created",
      description: `${newUser.name} has been added successfully.`
    });
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => 
      prev.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
    toast({
      title: "User Updated",
      description: `${updatedUser.name}'s information has been updated.`
    });
  };

  const deleteUser = (userId: number) => {
    const userToDelete = users.find(user => user.id === userId);
    
    if (!currentUser || currentUser.email !== "admin1@trialcorp.com") {
      toast({
        title: "Permission Denied",
        description: "Only admin1@trialcorp.com can delete users.",
        variant: "destructive"
      });
      return;
    }

    setUsers(prev => prev.filter(user => user.id !== userId));
    
    if (userToDelete) {
      toast({
        title: "User Deleted",
        description: `${userToDelete.name} has been removed from the system.`
      });
    }
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } 
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    if (user) {
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      toast({
        title: "Status Updated",
        description: `${user.name} is now ${newStatus}.`
      });
    }
  };

  const getUserCases = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user?.cases || [];
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      currentUser, 
      addUser, 
      updateUser, 
      deleteUser, 
      toggleUserStatus,
      getUserCases
    }}>
      {children}
    </UserContext.Provider>
  );
};
