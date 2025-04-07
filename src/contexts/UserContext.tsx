
import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserCase, UserRole } from "@/types/user";
import { toast } from "@/hooks/use-toast";

// Mock data to start with
const mockCases: UserCase[] = [
  { 
    id: 1, 
    title: "Suspicious Transaction #4392", 
    status: "Open", 
    assignedDate: "2023-06-15",
    assignedTo: "John Smith",
    actionsTaken: "Initial review completed"
  },
  { 
    id: 2, 
    title: "Account Verification #1205", 
    status: "In Progress", 
    assignedDate: "2023-06-10",
    assignedTo: "Emma Wilson",
    actionsTaken: "Customer contacted for additional documentation"
  },
  { 
    id: 3, 
    title: "Potential Fraud Alert #7823", 
    status: "Closed", 
    assignedDate: "2023-05-28", 
    closedDate: "2023-06-05",
    resolvedBy: "John Smith",
    resolution: "False positive confirmed after customer verification"
  },
  { 
    id: 4, 
    title: "Missing Documentation #9443", 
    status: "Open", 
    assignedDate: "2023-06-18",
    escalatedTo: "Michael Brown",
    escalatedDate: "2023-06-20",
    escalationReason: "Customer unresponsive after multiple attempts"
  },
  { 
    id: 5, 
    title: "Compliance Review #3356", 
    status: "In Progress", 
    assignedDate: "2023-06-12",
    assignedTo: "Sarah Davis"
  },
  {
    id: 6,
    title: "Major Fraud Investigation #8811",
    status: "In Progress",
    assignedDate: "2023-06-01",
    reportedToAuthorities: true,
    reportedTo: "Financial Intelligence Unit",
    reportedDate: "2023-06-05",
    referenceNumber: "FIU-2023-0042"
  },
  {
    id: 7,
    title: "Money Laundering Suspicion #6723",
    status: "Closed",
    assignedDate: "2023-05-15",
    closedDate: "2023-06-10",
    resolvedBy: "Emma Wilson",
    resolution: "Full investigation completed, case forwarded to compliance",
    reportedToAuthorities: true,
    reportedTo: "Financial Conduct Authority",
    reportedDate: "2023-05-20",
    referenceNumber: "FCA-2023-789"
  }
];

const mockUsers: User[] = [
  { id: 1, firstName: "Admin", lastName: "User", name: "Admin User", email: "admin1@trialcorp.com", role: "Administrator", status: "Active" },
  { id: 2, firstName: "John", lastName: "Smith", name: "John Smith", email: "jsmith@trialcorp.co.zw", role: "Analyst", status: "Active", cases: [mockCases[0], mockCases[2]] },
  { id: 3, firstName: "Emma", lastName: "Wilson", name: "Emma Wilson", email: "ewilson@trialcorp.co.zw", role: "Specialist", status: "Active", cases: [mockCases[1], mockCases[6]] },
  { id: 4, firstName: "Michael", lastName: "Brown", name: "Michael Brown", email: "mbrown@trialcorp.co.zw", role: "Manager", status: "Active", cases: [mockCases[3]] },
  { id: 5, firstName: "Sarah", lastName: "Davis", name: "Sarah Davis", email: "sdavis@trialcorp.co.zw", role: "Executive", status: "Active", cases: [mockCases[4]] },
];

interface UserContextType {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, "id" | "email"> & { firstName: string, lastName: string }) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  toggleUserStatus: (userId: number) => void;
  getUserCases: (userId: number) => UserCase[];
  getAllCases: () => UserCase[];
  updateCase: (caseData: UserCase) => void;
}

const UserContext = createContext<UserContextType>({
  users: [],
  currentUser: null,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  toggleUserStatus: () => {},
  getUserCases: () => [],
  getAllCases: () => [],
  updateCase: () => {},
});

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  // For demo purposes, set the admin as the current user
  const [currentUser] = useState<User | null>(mockUsers.find(user => user.email === "admin1@trialcorp.com") || null);
  const [cases, setCases] = useState<UserCase[]>(mockCases);

  const generateEmail = (firstName: string, lastName: string): string => {
    const firstInitial = firstName.charAt(0).toLowerCase();
    const surname = lastName.toLowerCase();
    return `${firstInitial}${surname}@trialcorp.co.zw`;
  };

  const addUser = (userData: Omit<User, "id" | "email"> & { firstName: string, lastName: string }) => {
    const { firstName, lastName, ...rest } = userData;
    const email = generateEmail(firstName, lastName);
    const name = `${firstName} ${lastName}`;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      toast({
        title: "User Already Exists",
        description: `A user with email ${email} already exists.`,
        variant: "destructive"
      });
      return;
    }

    const newUser: User = {
      ...rest,
      firstName,
      lastName,
      name,
      email,
      id: Math.max(...users.map(u => u.id), 0) + 1
    };

    setUsers(prev => [...prev, newUser]);
    toast({
      title: "User Created",
      description: `${newUser.name} has been added successfully with email ${email}.`
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

  const getAllCases = () => {
    return cases;
  };

  const updateCase = (caseData: UserCase) => {
    setCases(prev => 
      prev.map(c => c.id === caseData.id ? caseData : c)
    );
    
    // Also update the case in any user that has it
    setUsers(prev => 
      prev.map(user => {
        if (user.cases && user.cases.some(c => c.id === caseData.id)) {
          return {
            ...user,
            cases: user.cases.map(c => c.id === caseData.id ? caseData : c)
          };
        }
        return user;
      })
    );

    toast({
      title: "Case Updated",
      description: `Case #${caseData.id} has been successfully updated.`
    });
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      currentUser, 
      addUser, 
      updateUser, 
      deleteUser, 
      toggleUserStatus,
      getUserCases,
      getAllCases,
      updateCase
    }}>
      {children}
    </UserContext.Provider>
  );
};
