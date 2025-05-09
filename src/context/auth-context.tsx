import { createContext, useEffect, useState, type ReactNode } from "react";
import { AuthService } from "@/services/auth_service/auth-service";

type AuthContextType = {
  isAuthenticated: boolean;
  roles: string[];
  loading: boolean;
  checkAuth: () => Promise<void>; // add this
};
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  roles: [],
  loading: true,
  checkAuth: async () => {}, // default noop
});
type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await AuthService.authenticate();
      setIsAuthenticated(true);
      setRoles(response.roles);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, roles, loading, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
