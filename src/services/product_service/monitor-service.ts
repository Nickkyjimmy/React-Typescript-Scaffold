import type {
  CreateMonitorRequest,
  MonitorType,
  PaginatedResponse,
} from "@/types/monitor";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

const MonitorService = {
  async getAllMonitor(
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = "ID"
  ): Promise<PaginatedResponse<MonitorType>> {
    const response = await axios.get(`${API_URL}/monitor`, {
      params: {
        pageNo,
        pageSize,
        sortBy,
      },
    });

    console.log("Response data:", response.data);
    return response.data;
  },

  async createMonitor(monitor: CreateMonitorRequest): Promise<MonitorType> {
    const response = await axios.post(`${API_URL}/monitor`, monitor);
    return response.data;
  },

  async deleteMonitor(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/monitor/${id}`);
      alert("Monitor deleted successfully!");
    } catch (error) {
      console.error("Error deleting monitor:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  async updateMonitor(
    id: number,
    monitor: CreateMonitorRequest
  ): Promise<MonitorType> {
    const response = await axios.put(`${API_URL}/monitor/${id}`, monitor);
    return response.data;
  },
};

export default MonitorService;
