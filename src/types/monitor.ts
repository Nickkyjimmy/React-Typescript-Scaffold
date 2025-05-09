export interface Monitor {
  id: string;
  name: string;
  brand: string;
  price: number;
}

export type MonitorSortTypes = "id" | "name" | "brand" | "price";

export type MonitorSortOrder = "asc" | "desc";
