
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Monitor } from "@/types/monitor";
import { Button } from "../ui/button";
import { MonitorService } from "@/services/product-service/monitor-service";
import { AddDialog } from "./dialog-create-monitor";
import { UpdateDialog } from "./dialog-update-monitor";
import { PaginationDemo } from "./monitor_page";

type MonitorTableProp = {
  indexPage: number;
  setIndexPage: (indexPage: number) => void;
  maxPage: number;
  setMaxPage: (maxPage: number) => void;
  monitors: Monitor[];
  fetchMonitor: (index: number) => void;
};

export default function MonitorTable({
  indexPage,
  setIndexPage,
  maxPage,
  setMaxPage,
  monitors,
  fetchMonitor
}: MonitorTableProp) {

  // const [curCustomer, setCurCustomer] = useState<Customer>()


  useEffect(() => {
    fetchMonitor(indexPage)
  }, [indexPage])


  const handleDeleteMonitor = async (monitorId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        await MonitorService.deleteMonitor(monitorId);
        alert("Monitor deleted successfully.");
        fetchMonitor(indexPage); // Refresh the customer list after deletion
        // Optionally, you can refresh the customer list here
      } catch (error) {
        console.error("Error deleting monitor:", error);
        alert("Failed to delete monitor.");
      }
    }
  };


  return (
    <div>
      <Table className="w-3/4 mx-auto">
        <TableCaption>A list of monitors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Brand</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="">
              <AddDialog indexPage={indexPage} onSuccess={fetchMonitor} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            monitors.map((monitor, index) => (
              <TableRow key={monitor.id} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                <TableCell>{monitor.id}</TableCell>
                <TableCell>{monitor.name}</TableCell>
                <TableCell>{monitor.brand}</TableCell>
                <TableCell>{monitor.price}</TableCell>
                <TableCell>
                  <div className='flex flex-row gap-2'>
                    <Button className="bg-red-500 flex-1/2" onClick={() => handleDeleteMonitor(monitor.id)}>
                      Delete
                    </Button>
                    <div className='flex-1/2'>
                      <UpdateDialog indexPage={indexPage} monitor={monitor} onSuccess={fetchMonitor} />
                    </div>


                  </div>
                </TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
      <PaginationDemo indexPage={indexPage} setIndexPage={setIndexPage} maxPage={maxPage}></PaginationDemo>
    </div>
  );
}
