
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/user";
import { useUsers } from "@/contexts/UserContext";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddUserDialog = () => {
  const { addUser } = useUsers();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<UserRole>("Analyst");
  const [previewEmail, setPreviewEmail] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (value && lastName) {
      updateEmailPreview(value, lastName);
    } else {
      setPreviewEmail("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (firstName && value) {
      updateEmailPreview(firstName, value);
    } else {
      setPreviewEmail("");
    }
  };

  const updateEmailPreview = (first: string, last: string) => {
    const firstInitial = first.charAt(0).toLowerCase();
    const surname = last.toLowerCase();
    setPreviewEmail(`${firstInitial}${surname}@trialcorp.co.zw`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && role) {
      addUser({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
        status: "Active",
      });
      resetForm();
      setOpen(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setRole("Analyst");
    setPreviewEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account in the system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Specialist">Specialist</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AnimatePresence>
              {previewEmail && (
                <motion.div 
                  className="flex flex-col space-y-2 bg-orange-50 p-3 rounded-md border border-orange-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label>Generated Email</Label>
                  <div className="text-sm font-medium text-green-700">{previewEmail}</div>
                  <p className="text-xs text-orange-600">
                    This email will be automatically generated for the user
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
