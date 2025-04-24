
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import NotificationsDropdown from "./NotificationsDropdown";
import { toast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { useUsers } from "@/contexts/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAllCases } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Only perform search if we're not already on the cases page
    if (location.pathname !== "/cases" && query.trim()) {
      // Navigate to cases page with search query
      navigate(`/cases?search=${encodeURIComponent(query)}`);
    }
  }, [navigate, location.pathname]);

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
        
        <div className="flex-1 max-w-xl mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by case number, date, supplier..."
            className="w-full py-1.5 pl-10 pr-4"
            value={searchQuery}
            onChange={handleSearch}
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
