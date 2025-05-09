import { z } from "zod";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MonitorService from "@/services/product_service/monitor-service";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

type FormData = z.infer<typeof formSchema>;

type AddFormProps = {
  fetchProducts: () => void;
};

const AddForm = ({ fetchProducts }: AddFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reset form and clear errors when dialog is opened
  useEffect(() => {
    if (isDialogOpen) {
      form.reset();
      form.clearErrors(); // Clear any errors when dialog opens
    }
  }, [isDialogOpen, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await MonitorService.createMonitor(data);
      alert("Product created successfully!");
      form.reset();
      await fetchProducts();
    } catch (error: any) {
      console.error("Error creating product:", error);

      // Extract message if backend throws a 400 error with a string message
      const errorMessage =
        error?.response?.data || error?.message || "Failed to create product.";

      // Set field-level error for name
      form.setError("name", {
        type: "manual",
        message: errorMessage.includes("already exists")
          ? errorMessage
          : "Invalid product name",
      });

    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="UltraSharp 27" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price ..."
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex justify-between w-full">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save Product</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;
