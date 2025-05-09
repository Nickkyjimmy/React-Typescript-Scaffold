import { AuthContext } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import type { UserAuth } from "@/types/user";
import axios from "axios";
import { useContext } from "react";
import { set } from "react-hook-form";

const API_BASE_URL = "http://localhost:8080";

export const AuthService = {

  // const {isAuthenticated, setIsAuthenticated} = useAuth()

  async login(username: string, password: string): Promise<any> {
    const response = await axios.post(
      `${API_BASE_URL}/auth/sign-in`,
      {
        email: username,
        password,
      },
      {
        withCredentials: true, // Important: allows cookies to be stored
      }
    );
    console.log("Login response:", response.data); // Log the response data
    return response.data;
  },

  async logout(): Promise<void> {
    const response = await axios.post(`${API_BASE_URL}/auth/sign-out`, {}, { withCredentials: true });
    // setIsAuthenticated(false)
    console.log(response.data);
  },

  async authenticate(): Promise<UserAuth> {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      withCredentials: true, // Important: allows cookies to be stored
    });
    // console.log("qwjhdqwuihquidhuqd");
    console.log(response);
    return response.data;
  },
};
