
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
import type { Monitor } from "@/types/monitor";

const monitorFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
});

type monitorFormProps = {
  indexPage: number;
  monitor: Monitor;
  onSuccess: (index: number) => void;
};

export default function UpdateMonitorForm({
  indexPage,
  monitor,
  onSuccess
}: monitorFormProps) {
  const form = useForm<z.infer<typeof monitorFormSchema>>({
    resolver: zodResolver(monitorFormSchema),
    defaultValues: {
      name: monitor.name,
      brand: monitor.brand,
      price: monitor.price,
    },
  });

  const onSubmit = (data: z.infer<typeof monitorFormSchema>) => {
    console.log("SUBMIT");
    MonitorService.updateMonitor(monitor.id, data)
      .then(() => {
        onSuccess(indexPage)
        alert("Update successful");
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>

      </Form>
    </div>
  );
}
