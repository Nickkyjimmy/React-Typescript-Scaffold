import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthService } from "@/services/auth_service/auth-service";

type AuthContextType = {
  isAuthenticated: boolean;
  roles: string[];
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  roles: [],
  loading: true,
  checkAuth: async () => {},
  logout: async () => {},
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
      const response = await axios.get("http://localhost:8081/api/auth/me", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setRoles(response.data.roles);
    } catch (error) {
      setIsAuthenticated(false);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setRoles([]);
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, roles, loading, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
