// services/customer-service.ts
import axios from "axios";
import type { User, CreateUserInput } from "@/types/user";

const API_BASE_URL = "http://localhost:8081";

export const CustomerService = {
  async getCustomerData(): Promise<User[]> {
    const response = await axios.get<User[]>(`${API_BASE_URL}/customer`);
    return response.data;
  },

  async createCustomer(data: CreateUserInput): Promise<User> {
    const response = await axios.post<User>(`${API_BASE_URL}/customer`, data);
    return response.data;
  },
  async deleteCustomer(customerId: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/customer/${customerId}`);
  }

};
