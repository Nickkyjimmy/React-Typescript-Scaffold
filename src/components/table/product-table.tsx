import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRow from "./product-row";
import { fetchMonitorData } from "@/services/action/use-monitor-data";
import { useEffect, useState } from "react";
import type { Monitor } from "@/types/monitor";
import { AddProductDialog } from "../dialog/add-product-dialog";

export function ProductTable() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  useEffect(() => {
    const fetchMonitors = async () => {
      const monitors = await fetchMonitorData();
      setMonitors(Array.isArray(monitors) ? monitors : []);
    };
    fetchMonitors();
  }, []);

  return (
    <div className="container md:mx-auto w-full md:max-w-6xl">
      <Table className="table-fixed w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 text-center">#</TableHead>
            <TableHead className="w-1/6 text-center">Name</TableHead>
            <TableHead className="w-1/6 text-center">Brand</TableHead>
            <TableHead className="w-1/6 text-center">Price</TableHead>
            <TableHead className="w-2/6 text-center">
              <div className="w-full">
                <AddProductDialog
                  className="w-full bg-green-300"
                  setMonitors={setMonitors}
                  monitors={monitors}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors.length > 0 &&
            monitors.map((monitor, key) => (
              <ProductRow
                key={key}
                monitor={monitor}
                className={`${key % 2 == 0 ? "bg-gray-100" : ""}`}
                setMonitors={setMonitors}
                monitors={monitors}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
