import type { number } from "zod";

export interface Monitor {
    id: number,
    name: string,
    brand: string,
    price: number,
}

export interface CreateMonitorInput {
    name: string,
    brand: string,
    price: number
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    number: number;
}