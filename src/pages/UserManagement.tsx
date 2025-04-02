
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Trash, Shield, ShieldOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { UserProvider, useUsers } from "@/contexts/UserContext";
import { User } from "@/types/user";
import AddUserDialog from "@/components/users/AddUserDialog";
import UserCasesDialog from "@/components/users/UserCasesDialog";
import { Badge } from "@/components/ui/badge";

const UserManagementContent = () => {
  const { users, deleteUser, toggleUserStatus, currentUser } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    // Set page title
    document.title = "User Management | TransMatch Guardian";
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, users]);

  const handleUserAction = (action: string, userId: number) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit User",
          description: `Editing user ID ${userId} will be implemented in a future update.`,
        });
        break;
      case "delete":
        deleteUser(userId);
        break;
      case "activate":
      case "deactivate":
        toggleUserStatus(userId);
        break;
      default:
        break;
    }
  };

  return (
    <PageLayout title="User Management" description="Manage user accounts and permissions">
      <div className="flex items-center justify-between mb-6">
        <AddUserDialog />
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUserAction("edit", user.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      
                      {/* View cases button */}
                      <UserCasesDialog user={user} />
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleUserAction(
                            user.status === "Active" ? "deactivate" : "activate",
                            user.id
                          )
                        }
                      >
                        {user.status === "Active" ? (
                          <ShieldOff className="h-4 w-4" />
                        ) : (
                          <Shield className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </span>
                      </Button>
                      
                      {currentUser?.email === "admin1@trialcorp.com" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUserAction("delete", user.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

const UserManagement = () => (
  <UserProvider>
    <UserManagementContent />
  </UserProvider>
);

export default UserManagement;
