// services/customer-service.ts
import axios from "axios";
import type { User, CreateUserInput } from "@/types/user";

const API_BASE_URL = "http://localhost:8080";

export const CustomerService = {
  async getCustomerData(): Promise<User[]> {
    // console.log("IDASHUDIASUIDASH")
    const response = await axios.get<User[]>(`${API_BASE_URL}/customer/all`);
    // console.log(response)
    // console.log(response.data)
    return response.data
  },

  async getCustomerInfoById(id: number): Promise<User> {
    console.log("GETTING WITH ID")
    const response = await axios.get<User>(`${API_BASE_URL}/customer/id/${id}`)
    console.log(response)
    return response.data
  },

  async createCustomer(data:CreateUserInput): Promise<User>  {
    const response = await axios.post<User>(`${API_BASE_URL}/customer`, data)
    return response.data
  },

  async updateCustomer(id: number, data: CreateUserInput) : Promise<User> {
    const response = await axios.patch<User>(`${API_BASE_URL}/customer/${id}`, data)
    return response.data
  },

  async deleteCustomer(customerId: number): Promise<void> {
    await axios.delete<void>(`${API_BASE_URL}/customer/${customerId}`)
  } 

};
