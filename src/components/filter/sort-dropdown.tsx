import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Check } from "lucide-react";
import { Button } from "../ui/button";
import type { MonitorSortOrder, MonitorSortTypes } from "@/types/monitor";


interface SortDropdownMenuProps {
  sortBy: MonitorSortTypes;
  sortOrder: MonitorSortOrder;
  updateUrlParams: (params: {
    sortBy: MonitorSortTypes;
    sortOrder: MonitorSortOrder;
  }) => void;
  className?: string;
}

function SortDropdownMenu({
  sortBy,
  sortOrder,
  updateUrlParams,
  className,
}: SortDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <ArrowUpDown className="size-4" />
          Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => updateUrlParams({ sortBy: "id", sortOrder })}
        >
          ID {sortBy === "id" && <Check className="size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => updateUrlParams({ sortBy: "name", sortOrder })}
        >
          Name {sortBy === "name" && <Check className="size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => updateUrlParams({ sortBy: "brand", sortOrder })}
        >
          Brand {sortBy === "brand" && <Check className="size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => updateUrlParams({ sortBy: "price", sortOrder })}
        >
          Price {sortBy === "price" && <Check className="size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortDropdownMenu;
