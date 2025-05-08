import { TableCell, TableRow } from "@/components/ui/table";
import type { Monitor } from "@/types/monitor";

function ProductRow({
  monitor,
  key,
  className,
}: {
  monitor: Monitor;
  key: number;
  className: string;
}) {
  return (
    <TableRow className={`w-full ${className}`} key={key}>
      <TableCell className="w-1/6 text-center">{monitor.id}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.name}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.brand}</TableCell>
      <TableCell className="w-1/6 text-center">{monitor.price}</TableCell>
      <TableCell className="w-2/6 text-center">{monitor.price}</TableCell>
    </TableRow>
  );
}

export default ProductRow;
