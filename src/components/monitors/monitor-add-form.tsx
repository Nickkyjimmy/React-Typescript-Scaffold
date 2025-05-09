
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerService } from "@/services/product-service/customer-service";
import type { User } from "@/types/user";
import { useEffect } from "react";
import { DialogFooter } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MonitorService } from "@/services/product-service/monitor-service";
import { PaginationDemo } from "./monitor_page";

const monitorFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  price: z.number().min(1, { message: "Price must be at least 1" }).max(10000, {message: "Price must be less than 10000"}),
});

type monitorFormProps = {
  indexPage: number;
  onSuccess: (index: number) => void;
};

export default function MonitorForm({
  indexPage,
  onSuccess
}: monitorFormProps) {
  const form = useForm<z.infer<typeof monitorFormSchema>>({
    resolver: zodResolver(monitorFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof monitorFormSchema>) => {
    console.log("SUBMIT");
    MonitorService.createMonitor(data)
      .then(() => {
        form.reset();
        onSuccess(indexPage);
        alert("Monitor created successfully.");
      })
      .catch((error) => {
        console.error("Error creating monitor:", error);
        const errorMessage = error.response?.data || "Failed to create monitor.";
        console.log(error)
        console.log(errorMessage);
        // Set field error for name
        form.setError("name", {
          type: "manual",
          message: errorMessage.includes("already exists") ? errorMessage : "Invalid name",
        });
        // alert("Failed to create monitor.");
      });
  };

  return (
    <div className="space-y-4">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-row gap-x-4'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-row gap-x-4'>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-row gap-x-4'>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} onChange={(e) => {
                      field.onChange(e.target.valueAsNumber)
                    }} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Move to the right corner */}
          {/* <div className="flex justify-end">
                <Button type="submit">{isUpdated===true ? "Update Customer" : "Create Customer"}</Button>
              </div> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>

      </Form>
    </div>
  );
}
