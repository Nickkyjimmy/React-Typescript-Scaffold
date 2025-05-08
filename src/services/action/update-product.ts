import type { Monitor } from "@/types/monitor";
import API from "../api-client";

export const updateProduct = async (product: Monitor) => {
  const response = await API.put(`/product/monitors/${product.id}`, {
    name: product.name,
    brand: product.brand,
    price: product.price,
  });
  return response;
};
