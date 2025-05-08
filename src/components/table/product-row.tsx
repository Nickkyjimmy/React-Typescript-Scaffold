import { TableCell, TableRow } from "@/components/ui/table";
import type { Monitor } from "@/types/monitor";
import { Button } from "../ui/button";
import { deleteProduct } from "@/services/action/delete-product";
import { toast } from "sonner";
import { UpdateProductDialog } from "../dialog/update-product-dialog";
import { fetchMonitorData } from "@/services/action/use-monitor-data";

type ProductRowProps = {
  monitor: Monitor;
  key: number;
  className: string;
  setMonitors: (monitors: Monitor[]) => void;
  monitors: Monitor[];
};

function ProductRow({
  monitor,
  key,
  className,
  setMonitors,
  monitors,
}: ProductRowProps) {
  const handleDelete = () => {
    const onCreateMonitor = deleteProduct(monitor.id);

    toast.promise(onCreateMonitor, {
      loading: "Deleting monitor...",
      success: async () => {
        const fetchMonitors = await fetchMonitorData();
        setMonitors(Array.isArray(fetchMonitors) ? fetchMonitors : []);

        return "Monitor deleted successfully";
      },
      error: (error) => {
        const message =
          error?.response?.data?.message || "Failed to delete monitor";
        return message;
      },
    });
  };

  return (
    <TableRow className={`w-full ${className}`} key={key}>
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
