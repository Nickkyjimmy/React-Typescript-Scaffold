import type { Monitor, MonitorSortOrder, MonitorSortTypes } from "@/types/monitor";
import { useState, useEffect } from "react";
import { ProductTable } from "./product-table";
import { useSearchParams } from "react-router-dom";
import { fetchPaginatedMonitorData } from "@/services/action/use-monitor-data";
import SortDropdownMenu from "../filter/sort-dropdown";

function ProductTableContainer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get("pageNumber")) || 0;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const sortBy = (searchParams.get("sortBy") as MonitorSortTypes) || "id";
  const sortOrder =
    (searchParams.get("sortOrder") as MonitorSortOrder) || "asc";

  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    const fetchPaginatedAndSortedData = async () => {
      const { data, totalPages, totalElements } =
        await fetchPaginatedMonitorData(
          pageNumber,
          pageSize,
          sortBy,
          sortOrder
        );
      setMonitors(Array.isArray(data) ? data : []);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    };
    fetchPaginatedAndSortedData();
  }, [pageNumber, pageSize, sortBy, sortOrder]);

  const updateUrlParams = ({
    pageNumber,
    pageSize,
    sortBy,
    sortOrder,
  }: {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: MonitorSortTypes;
    sortOrder?: MonitorSortOrder;
  }) => {
    const params = new URLSearchParams();
    if (pageNumber !== undefined)
      params.set("pageNumber", pageNumber.toString());
    if (pageSize !== undefined) params.set("pageSize", pageSize.toString());
    if (sortBy !== undefined) params.set("sortBy", sortBy);
    if (sortOrder !== undefined) params.set("sortOrder", sortOrder);
    setSearchParams(params);
  };

  return (
    <div className="container md:mx-auto w-full md:max-w-6xl">
      <div className="mb-4">
        <SortDropdownMenu
          sortBy={sortBy as MonitorSortTypes}
          sortOrder={sortOrder as MonitorSortOrder}
          updateUrlParams={({ sortBy, sortOrder }) =>
            updateUrlParams({ pageNumber, pageSize, sortBy, sortOrder })
          }
        />
      </div>

      <ProductTable
        monitors={monitors}
        setMonitors={setMonitors}
        pageNumber={pageNumber}
        onPageChange={(pageNumber: number) =>
          updateUrlParams({ pageNumber, pageSize, sortBy, sortOrder })
        }
        pageSize={pageSize}
        totalPages={totalPages}
        totalElements={totalElements}
        setTotalPages={setTotalPages}
        setTotalElements={setTotalElements}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
}

export default ProductTableContainer;
