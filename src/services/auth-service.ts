import apiClient from "./api-client"
import type { User } from "../types/user"

export async function login(email: string, password: string): Promise<User> {
  const response = await apiClient.post("/auth/login", { email, password })

  // Store the token in localStorage
  localStorage.setItem("token", response.data.token)

  return response.data.user
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post("/auth/logout")
  } finally {
    // Always clear the token from localStorage
    localStorage.removeItem("token")
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      return null
    }

    const response = await apiClient.get("/auth/me")
    return response.data
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function getToken(): Promise<string | null> {
  return localStorage.getItem("token")
}
