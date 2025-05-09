import { createContext, useEffect, useState, type ReactNode } from "react";
import { AuthService } from "@/services/auth_service/auth-service";

type AuthContextType = {
  isAuthenticated: boolean;
  roles: string[];
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  roles: [],
  loading: true,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.authenticate();
        setIsAuthenticated(true);
        // console.log("User roles:", response.roles);
        setRoles(response.roles);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
