
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUsers } from '@/contexts/UserContext';
import { checkPermission } from '@/utils/rolePermissions';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { RolePermission } from '@/types/user';

type Permission = keyof RolePermission['permissions'];

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requiredRoles?: string[];
}

/**
 * A component that protects routes based on user authentication and permissions
 */
const ProtectedRoute = ({ 
  children, 
  requiredPermission, 
  requiredRoles 
}: ProtectedRouteProps) => {
  const { currentUser } = useUsers();

  // If no user is logged in, redirect to home (would be login page in real app)
  if (!currentUser) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  // Loading state while checking permissions
  const isCheckingPermissions = !currentUser || !currentUser.role;
  if (isCheckingPermissions) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="mt-4 text-gray-600">Verifying permissions...</p>
      </div>
    );
  }

  // Check if user has required role (if specified)
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(currentUser.role);
    if (!hasRequiredRole) {
      toast({
        title: "Access Denied",
        description: `You need one of these roles to access this page: ${requiredRoles.join(', ')}`,
        variant: "destructive"
      });
      return <Navigate to="/" replace />;
    }
  }

  // Check if user has required permission (if specified)
  if (requiredPermission) {
    const hasPermission = checkPermission(currentUser.role, requiredPermission);
    if (!hasPermission) {
      toast({
        title: "Access Denied",
        description: `You don't have permission to access this feature.`,
        variant: "destructive"
      });
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
