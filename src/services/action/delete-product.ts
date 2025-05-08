import API from "../api-client";

export const deleteProduct = async (id: string) => {
  const response = await API.delete(`/product/monitors/${id}`);

  return response;
};
