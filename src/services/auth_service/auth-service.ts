import type { UserAuth } from "@/types/user";
import axios from "axios";

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
};
