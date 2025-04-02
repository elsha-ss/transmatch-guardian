
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import { useUsers } from "@/contexts/UserContext";
import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserCasesDialogProps {
  user: User;
}

const UserCasesDialog = ({ user }: UserCasesDialogProps) => {
  const { getUserCases } = useUsers();
  const cases = getUserCases(user.id);

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ClipboardList className="h-4 w-4" />
          <span className="sr-only">View Cases</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Cases handled by {user.name}</DialogTitle>
          <DialogDescription>
            View all cases assigned to this user and their current status.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {cases.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cases assigned to this user.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Closed Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">#{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(caseItem.status)}>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseItem.assignedDate}</TableCell>
                    <TableCell>{caseItem.closedDate || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserCasesDialog;
