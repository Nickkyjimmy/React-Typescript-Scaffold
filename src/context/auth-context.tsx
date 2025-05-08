import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/me", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setRoles(response.data.roles);
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
