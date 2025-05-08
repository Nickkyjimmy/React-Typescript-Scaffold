import API from "@/services/api-client";

export const fetchMonitorData = async() => {
  const response = await API.get("/product/monitors");
  
  return response.data;
}