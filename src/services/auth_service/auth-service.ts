import type { UserAuth } from "@/types/user";
import axios from "axios";
import API from "../api-client";

export const AuthService = {
  async login(username: string, password: string): Promise<any> {
    const response = await axios.post(
      "http://localhost:8081/api/auth/sign-in",
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
  async authenticate(): Promise<UserAuth> {
    const response = await axios.get("http://localhost:8081/api/auth/me", {
      withCredentials: true, // Important: allows cookies to be stored
    });
    return response.data;
  },
  async logout(): Promise<any> {
    try {
      // const res = await axios.post(
      //   "http://localhost:8081/api/auth/sign-out",
      //   {},
      //   { withCredentials: true } // Ensure credentials (cookies) are sent with the request
      // );
      const res = await API.post(
        "/auth/sign-out",
      );
      return res.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
};
