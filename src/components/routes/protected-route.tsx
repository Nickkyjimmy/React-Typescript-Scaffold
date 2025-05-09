import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { UserRole } from "../../types/user";
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

  console.log("[ProtectedRoute] user:", user, "loading:", loading);

  if (loading) return null;

  if (
    !user ||
    !user.role ||
    !accessRole.some((role) => user.role.includes(role))
  ) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
