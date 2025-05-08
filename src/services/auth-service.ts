import API from "./api-client";
import type { User } from "../types/user";

export async function login(email: string, password: string): Promise<void> {
  await API.post(
    "/auth/sign-in",
    { email, password },
    { withCredentials: true }
  );
}

export async function logout(): Promise<void> {
  await API.post("/auth/sign-out", {}, { withCredentials: true });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await API.get("/user/me", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
