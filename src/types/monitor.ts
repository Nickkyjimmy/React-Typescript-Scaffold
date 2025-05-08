export interface MonitorType {
  id: number;
  name: string;
  brand: string;
  price: number;
}

export interface CreateMonitorRequest {
  name: string;
  brand: string;
  price: number;
}

export interface PaginatedResponse<T> {
    content: T[]
    totalPages: number
  }