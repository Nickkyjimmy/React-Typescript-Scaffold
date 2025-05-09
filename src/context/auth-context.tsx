import { createContext, useEffect, useState, type ReactNode } from "react";
import { AuthService } from "@/services/auth_service/auth-service";

type AuthContextType = {
  isAuthenticated: boolean;
  roles: string[];
  loading: boolean;
  checkAuth: () => Promise<void>; // add this
  setIsAuthenticated: (isAuthenticated: boolean) => void; // add this
  setRoles: (roles: []) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  roles: [],
  loading: true,
  checkAuth: async() => {} ,
  setIsAuthenticated: () => {},
  setRoles: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const checkAuth = async () => {
    try {
      const response = await AuthService.authenticate();
      console.log("123123", response.roles)
      setIsAuthenticated(true);
      console.log("User roles:", response.roles);
      setRoles(response.roles);
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, loading, checkAuth, setIsAuthenticated, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
