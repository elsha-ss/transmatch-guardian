
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/user";
import { useUsers } from "@/contexts/UserContext";
import { isValidEmail } from "@/utils/rolePermissions";
import { Plus } from "lucide-react";

const AddUserDialog = () => {
  const { addUser } = useUsers();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Analyst");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setEmailError("Email must end with @trialcorp.com");
      return;
    }
    
    setEmailError("");
    addUser({
      name,
      email,
      role,
      status: "Active",
    });
    
    // Reset form and close dialog
    setName("");
    setEmail("");
    setRole("Analyst");
    setOpen(false);
  };

  const validateEmail = (value: string) => {
    setEmail(value);
    if (value && !isValidEmail(value)) {
      setEmailError("Email must end with @trialcorp.com");
    } else {
      setEmailError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. Only @trialcorp.com emails are allowed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Specialist">Specialist</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
