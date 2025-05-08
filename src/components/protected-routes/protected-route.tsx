import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRoles?: string[]; // optional
};

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, roles, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (requiredRoles && !requiredRoles.some((role) => roles.includes(role))) {
    return <div>403 - Forbidden</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
