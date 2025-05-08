import AddForm from "@/components/product/add-form";
import ProductCell from "@/components/product/table-cell";
import { TableHeader, TableRow, Table, TableHead } from "@/components/ui/table";
import MonitorService from "@/services/product_service/monitor-service";

import { useEffect, useState } from "react";
type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  // Loading 7 products per page
  const [pageSize] = useState(7);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState("ID");

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage);
  };
  const handleSortChange = (value: string) => {
    setSortType(value); // Update sortType state when a new sort option is selected
  };

  const fetchProducts = async () => {
    try {
      const data = await MonitorService.getAllMonitor(page,pageSize, sortType);
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page, , sortType]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="place-items-end p-4">
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort table by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel></SelectLabel> */}
              <SelectItem value="ID">ID</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="brand">Brand</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[75%] mx-auto">
        <Table>
          <TableHeader className="w-full">
            <TableRow>
              <TableHead className="font-bold w-1/6">#</TableHead>
              <TableHead className="font-bold w-1/6">Name</TableHead>
              <TableHead className="font-bold w-1/6">Brand</TableHead>
              <TableHead className="font-bold w-1/6">Price</TableHead>
              <TableHead className="w-1/6">
                <div className="w-full">
                  <AddForm fetchProducts={fetchProducts} />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <ProductCell products={products} fetchProducts={fetchProducts} />
        </Table>
        <Pagination className="w-full mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === page}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
