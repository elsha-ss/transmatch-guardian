
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Matching from "./pages/transactions/Matching";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Cases from "./pages/Cases";
import NotFound from "./pages/NotFound";
import { RolePermission } from "./types/user";

type Permission = keyof RolePermission['permissions'];

const queryClient = new QueryClient();
{}
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/upload" element={
              <ProtectedRoute requiredPermission={"import" as Permission}>
                <Upload />
              </ProtectedRoute>
            } />
            
            <Route path="/transactions/matching" element={
              <ProtectedRoute requiredRoles={["Administrator", "Specialist", "Analyst"]}>
                <Matching />
              </ProtectedRoute>
            } />
            
            <Route path="/transactions/reconciliation" element={
              <ProtectedRoute requiredRoles={["Administrator", "Manager", "Specialist"]}>
                <Upload />
              </ProtectedRoute>
            } />
            
            <Route path="/transactions/history" element={
              <ProtectedRoute requiredPermission={"read" as Permission}>
                <Upload />
              </ProtectedRoute>
            } />
            
            <Route path="/cases" element={
              <ProtectedRoute requiredPermission={"handleCases" as Permission}>
                <Cases />
              </ProtectedRoute>
            } />
            
            <Route path="/alerts" element={
              <ProtectedRoute requiredPermission={"reviewAlerts" as Permission}>
                <Alerts />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute requiredPermission={"export" as Permission}>
                <Reports />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={<UserManagement />} />
            
            <Route path="/settings" element={
              <ProtectedRoute requiredRoles={["Administrator"]}>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
