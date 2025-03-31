
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash, Shield, ShieldOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Administrator", status: "Active" },
  { id: 2, name: "John Smith", email: "john@example.com", role: "Auditor", status: "Active" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", role: "Accountant", status: "Active" },
  { id: 4, name: "Michael Brown", email: "michael@example.com", role: "Manager", status: "Inactive" },
  { id: 5, name: "Sarah Davis", email: "sarah@example.com", role: "Procurement Officer", status: "Active" },
];

const UserManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = "User Management | TransMatch Guardian";
  }, []);

  const handleUserAction = (action: string, userId: number) => {
    toast({
      title: `User Action: ${action}`,
      description: `Action ${action} for user ID ${userId} will be implemented in a future update.`,
    });
  };

  const handleCreateUser = () => {
    toast({
      title: "Create User",
      description: "New user creation will be implemented in a future update.",
    });
  };

  return (
    <PageLayout title="User Management" description="Manage user accounts and permissions">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button onClick={handleCreateUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                onChange={() => {}}
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
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUserAction(user.status === "Active" ? "deactivate" : "activate", user.id)}
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUserAction("delete", user.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
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

export default UserManagement;
