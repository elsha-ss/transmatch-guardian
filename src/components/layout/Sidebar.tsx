import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  LineChart, 
  FileText, 
  AlertTriangle, 
  Users, 
  Settings,
  ChevronRight,
  ChevronDown,
  CircleDollarSign,
  FolderOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ 
  to, 
  icon, 
  label, 
  active, 
  badge, 
  disabled = false,
  onClick 
}: SidebarLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      toast({
        title: "Feature not available",
        description: `The ${label} feature is coming soon!`,
        variant: "destructive",
      });
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-4 py-2.5 text-sm font-medium rounded-md mb-1 transition-all duration-200",
        active
          ? "bg-green-100 text-green-800"
          : "text-gray-600 hover:bg-orange-50 hover:text-orange-800",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <span className="flex items-center">
        {icon}
      </span>
      <span className="ml-3 flex-1">{label}</span>
      {badge && (
        <span className="ml-auto bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
          {badge}
        </span>
      )}
    </Link>
  );
};

interface SidebarGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup = ({ label, icon, children, defaultOpen = false }: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-800 rounded-md transition-all duration-200"
      >
        <span className="flex items-center">
          {icon}
        </span>
        <span className="ml-3 flex-1">{label}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && <div className="pl-4 mt-1">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto py-4 flex flex-col">
      <div className="px-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <CircleDollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-green-600">Unmatched Transactions</p>
              <p className="text-lg font-semibold text-green-800">143</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2">
        <SidebarLink
          to="/"
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          active={path === "/"}
        />
        
        <SidebarLink
          to="/upload"
          icon={<Upload className="h-5 w-5" />}
          label="Data Upload"
          active={path === "/upload"}
        />
        
        <SidebarGroup 
          label="Transactions" 
          icon={<FileText className="h-5 w-5" />}
          defaultOpen={path.includes('/transactions')}
        >
          <SidebarLink
            to="/transactions/matching"
            icon={<div className="w-2 h-2 rounded-full bg-green-400 ml-1 mr-1" />}
            label="Matching"
            active={path === "/transactions/matching"}
          />
          <SidebarLink
            to="/transactions/reconciliation"
            icon={<div className="w-2 h-2 rounded-full bg-green-400 ml-1 mr-1" />}
            label="Reconciliation"
            active={path === "/transactions/reconciliation"}
          />
          <SidebarLink
            to="/transactions/history"
            icon={<div className="w-2 h-2 rounded-full bg-green-400 ml-1 mr-1" />}
            label="History"
            active={path === "/transactions/history"}
          />
        </SidebarGroup>
        
        <SidebarLink
          to="/cases"
          icon={<FolderOpen className="h-5 w-5" />}
          label="Case Management"
          active={path === "/cases"}
        />
        
        <SidebarLink
          to="/alerts"
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Fraud Alerts"
          active={path === "/alerts"}
          badge={5}
        />
        
        <SidebarLink
          to="/reports"
          icon={<LineChart className="h-5 w-5" />}
          label="Reports"
          active={path === "/reports"}
        />
      </div>

      <div className="mt-auto px-2">
        <SidebarLink
          to="/users"
          icon={<Users className="h-5 w-5" />}
          label="User Management"
          active={path === "/users"}
        />
        
        <SidebarLink
          to="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          active={path === "/settings"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
