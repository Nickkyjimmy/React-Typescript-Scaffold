import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRow from "./product-row";
import type { Monitor } from "@/types/monitor";
import { AddProductDialog } from "../dialog/add-product-dialog";
import { TablePagination } from "../filter/table-pagination";

type ProductTableProps = {
  monitors: Monitor[];
  setMonitors: (monitors: Monitor[]) => void;
  pageNumber: number;
  onPageChange: (pageNumber: number) => void;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  setTotalPages: (totalPages: number) => void;
  setTotalElements: (totalElements: number) => void;
  sortBy: string;
  sortOrder: string;
};

export function ProductTable({
  monitors,
  setMonitors,
  pageNumber,
  onPageChange,
  pageSize,
  totalPages,
  setTotalPages,
  setTotalElements,
  sortBy,
  sortOrder,
}: ProductTableProps) {
  return (
    <div className="container md:mx-auto w-full md:max-w-6xl">
      <Table className="table-fixed w-full">
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
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  setTotalPages={setTotalPages}
                  setTotalElements={setTotalElements}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors.length > 0 ? (
            monitors.map((monitor, index) => (
              <ProductRow
                key={monitor.id}
                monitor={monitor}
                className={`${index % 2 == 0 ? "bg-gray-100" : ""}`}
                setMonitors={setMonitors}
                monitors={monitors}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setTotalPages={setTotalPages}
                setTotalElements={setTotalElements}
                onPageChange={onPageChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center p-4">
                No monitors found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan={5} className="bg-background hover:bg-background">
              <div className="w-full flex justify-center">
                <TablePagination
                  className="bg-background p-4"
                  pageNumber={pageNumber}
                  onPageChange={onPageChange}
                  totalPages={totalPages}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
