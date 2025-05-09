import axios from "axios"
import type { Monitor, CreateMonitorInput, PaginatedResponse } from "@/types/monitor"
import API from "../api-client";
const API_BASE_URL = "http://localhost:8080";

export const MonitorService = {
  // async getAllMonitors(index: number): Promise<PaginatedResponse<Monitor>>{
  //     const response = await axios.get<PaginatedResponse<Monitor>(`${API_BASE_URL}/monitor/all?pageNo=${index}&pageSize=5&sortBy=id`);
  //     console.log(response)
  //     return response.data
  // },
  async getAllMonitors(pageNo: number, pageSize: number = 5, sortBy: string = "id"): Promise<PaginatedResponse<Monitor>> {

    const response = await axios.get<PaginatedResponse<Monitor>>(`${API_BASE_URL}/monitor/all`, {
      params: {
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: sortBy
      },
      withCredentials: true, // Important: allows cookies to be stored
    });
    console.log(response)
    return response.data;
  },


  async createMonitor(data: CreateMonitorInput): Promise<Monitor> {
    console.log("Creating monitor with data:", data); // Log the data being sent
    const response = await axios.post<Monitor>(`${API_BASE_URL}/monitor`, data, {withCredentials:true});
    return response.data
  },

  async updateMonitor(id: number, data: CreateMonitorInput): Promise<Monitor> {
    const response = await axios.put<Monitor>(`${API_BASE_URL}/monitor/${id}`, data, {withCredentials:true});
    return response.data
  },

  async deleteMonitor(id: number): Promise<void> {
    await axios.delete<void>(`${API_BASE_URL}/monitor/${id}`, {withCredentials:true})
  }
}