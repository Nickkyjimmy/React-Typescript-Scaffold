import API from "../api-client";

type Product = {
  name: string;
  brand: string;
  price: number;
};

export const createProduct = async (product: Product) => {
  const response = await API.post("/product/monitors", product);
  return response;
};
