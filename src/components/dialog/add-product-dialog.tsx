import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/services/action/create-product";
import { toast } from "sonner";
import type { Monitor } from "@/types/monitor";
import { fetchPaginatedMonitorData } from "@/services/action/use-monitor-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  addProductFormSchema,
  type AddProductFormSchema,
} from "@/schemas/product-form-schema";

type AddProductDialogProps = {
  setMonitors: (monitors: Monitor[]) => void;
  monitors: Monitor[];
  pageNumber: number;
  pageSize: number;
  setTotalPages: (totalPages: number) => void;
  setTotalElements: (totalElements: number) => void;
  className?: string;
  sortBy: string;
  sortOrder: string;
};

export function AddProductDialog({
  setMonitors,
  className,
  pageNumber,
  pageSize,
  setTotalPages,
  setTotalElements,
  sortBy,
  sortOrder,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
    },
  });

  const handleSubmit = async (data: AddProductFormSchema) => {
    setIsLoading(true);
    const onCreateMonitor = createProduct(data);
    toast.promise(onCreateMonitor, {
      loading: "Creating monitor...",
      success: async () => {
        setOpen(false);
        setIsLoading(false);
        form.reset();
        const { data, totalPages, totalElements } =
          await fetchPaginatedMonitorData(
            pageNumber,
            pageSize,
            sortBy,
            sortOrder
          );
        setMonitors(data);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
        return "Monitor created successfully";
      },
      error: (error) => {
        setIsLoading(false);

        switch (error.response.status) {
          case 401:
            return "Unauthorized";
          case 403:
            return "Forbidden";
          case 409:
            return "Product name already exists, use a different name";
          default:
            return "Failed to create monitor";
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product name"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <div className="col-span-4 col-start-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel className="text-right">Brand</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product brand"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <div className="col-span-4 col-start-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel className="text-right">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0.00"
                        min="0"
                        className="col-span-3"
                        {...field}
                        value={
                          typeof field.value === "number" ||
                          typeof field.value === "string"
                            ? field.value
                            : ""
                        }
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <div className="col-span-4 col-start-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
