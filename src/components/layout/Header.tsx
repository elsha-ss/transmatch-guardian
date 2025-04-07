
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import NotificationsDropdown from "./NotificationsDropdown";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Navigating to your profile page",
    });
    // Would typically navigate to profile page
    // navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out of the system",
    });
    // Would typically handle logout logic then redirect
    // In a real app, we'd clear auth tokens, etc.
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-9 w-9 rounded-md bg-green-600 text-white flex items-center justify-center mr-2">
              <span className="font-bold text-lg">TG</span>
            </div>
            <h1 className="text-xl font-bold text-green-800">TransMatch Guardian</h1>
          </Link>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search transactions, vendors, alerts..."
            className="w-full py-1.5 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <NotificationsDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-orange-600" />
                </div>
                <span className="font-medium text-sm hidden md:inline">Admin User</span>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
