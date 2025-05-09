import {TableCell, TableRow} from "@/components/ui/table";
import type {Monitor} from "@/types/monitor";
import {Button} from "../ui/button";
import {deleteProduct} from "@/services/action/delete-product";
import {toast} from "sonner";
import {UpdateProductDialog} from "../dialog/update-product-dialog";
import {fetchPaginatedMonitorData} from "@/services/action/use-monitor-data";

type ProductRowProps = {
  monitor: Monitor;
  className: string;
  setMonitors: (monitors: Monitor[]) => void;
  monitors: Monitor[];
  pageNumber: number;
  pageSize: number;
  setTotalPages: (totalPages: number) => void;
  setTotalElements: (totalElements: number) => void;
  onPageChange: (newPage: number) => void;
  sortBy: string;
  sortOrder: string;
};

function ProductRow({
  monitor,
  className,
  setMonitors,
  monitors,
  pageNumber,
  pageSize,
  setTotalPages,
  setTotalElements,
  onPageChange,
  sortBy,
  sortOrder,
}: ProductRowProps) {
  const handleDelete = () => {
    const onDeleteMonitor = deleteProduct(monitor.id);

    toast.promise(onDeleteMonitor, {
      loading: "Deleting monitor...",
      success: async () => {
        const { data, totalPages, totalElements } =
          await fetchPaginatedMonitorData(pageNumber, pageSize, sortBy, sortOrder);

        if (data.length === 0 && pageNumber > 0) {
          onPageChange(pageNumber - 1);
          return "Monitor deleted successfully";
        }

        setMonitors(Array.isArray(data) ? data : []);
        setTotalPages(totalPages);
        setTotalElements(totalElements);

        return "Monitor deleted successfully";
      },
      error: (error) => {
        switch (error.response.status) {
          case 401:
            return "Unauthorized";
          case 403:
            return "Forbidden";
          case 404:
            return "Can't find monitor with id: " + monitor.id;
          default:
            return "Failed to delete monitor";
        }
      },
    });
  };

  return (
    <TableRow className={`w-full ${className}`}>
      <TableCell className="w-1/6 text-center">{monitor.id}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.name}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.brand}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.price}</TableCell>
      <TableCell className="w-2/6 text-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <UpdateProductDialog
            className="flex-1 bg-blue-100"
            setMonitors={setMonitors}
            monitors={monitors}
            monitor={monitor}
            pageNumber={pageNumber}
            pageSize={pageSize}
            setTotalPages={setTotalPages}
            setTotalElements={setTotalElements}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
