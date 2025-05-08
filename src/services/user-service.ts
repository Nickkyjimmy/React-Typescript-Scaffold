import API from "./api-client";
import type { User } from "../types/user";

export async function getUserData(userId: string): Promise<User> {
  const response = await API.get(`/users/${userId}`);
  return response.data;
}

export async function updateUserProfile(
  userId: string,
  data: Partial<User>
): Promise<User> {
  const response = await API.put(`/users/${userId}`, data);
  return response.data;
}
