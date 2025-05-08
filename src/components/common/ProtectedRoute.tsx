import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { UserRole } from "../../types/user-role";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  accessRole: UserRole[];
  children: ReactNode;
}

export default function ProtectedRoute({
  accessRole,
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || !accessRole.includes(user.role as UserRole)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
