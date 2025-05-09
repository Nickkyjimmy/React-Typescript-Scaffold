import API from "@/services/api-client";

export const fetchMonitorData = async () => {
  const response = await API.get("/product/monitors");

  return response.data;
};

export const fetchPaginatedMonitorData = async (
  pageNumber: number,
  pageSize: number,
  sortBy: string,
  sortOrder: string
) => {
  const response = await API.get("/product/monitors", {
    params: {
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
    },
  });

  const { content: data, totalPages, totalElements } = response.data;

  return { data, totalPages, totalElements };
};
