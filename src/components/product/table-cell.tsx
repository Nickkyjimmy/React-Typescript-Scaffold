import { TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import MonitorService from "@/services/product_service/monitor-service";
import type { MonitorType } from "@/types/monitor";
import UpdateForm from "./update-form";

type ProductCellProps = {
  products: {
    id: number;
    name: string;
    brand: string;
    price: number;
  }[];
  fetchProducts: () => void;
};

const ProductCell = ({ products, fetchProducts }: ProductCellProps) => {
  const handleDelete = async (id: number) => {
    // Implement delete functionality here
    try {
      await MonitorService.deleteMonitor(id);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <TableBody>
      {products.map((product, index) => (
        <TableRow
          key={product.id}
          className={index % 2 === 1 ? "bg-gray-100" : ""}
        >
          <TableCell>{product.id}</TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.brand}</TableCell>
          <TableCell>{product.price}</TableCell>
          <TableCell>
            <div className="flex gap-x-2">
              <UpdateForm product={product} fetchProducts={fetchProducts}/>
              <Button
                className="flex-1/2 bg-red-400"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ProductCell;
