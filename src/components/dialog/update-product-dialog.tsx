"use client";

import type React from "react";

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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Monitor } from "@/types/monitor";
import { updateProduct } from "@/services/action/update-product";
import { fetchMonitorData } from "@/services/action/use-monitor-data";

type UpdateProductDialogProps = {
  setMonitors: (monitors: Monitor[]) => void;
  monitors: Monitor[];
  className?: string;
  monitor: Monitor;
};

export function UpdateProductDialog({
  setMonitors,
  className,
  monitor,
}: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const monitorData = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      price: Number(formData.get("price")),
    };

    const onUpdateMonitor = updateProduct({
      ...monitorData,
      id: monitor.id,
    });

    toast.promise(onUpdateMonitor, {
      loading: "Updating monitor...",
      success: async () => {
        setOpen(false);
        setIsLoading(false);

        const fetchMonitors = await fetchMonitorData();
        setMonitors(fetchMonitors);

        return "Monitor updated successfully";
      },
      error: (error) => {
        setIsLoading(false);
        const message =
          error?.response?.data?.message || "Failed to update monitor";
        return message;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Product #{monitor.id}</DialogTitle>
            <DialogDescription>
              Fill in the details to update the product #{monitor.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={monitor.name}
                placeholder="Product name"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                defaultValue={monitor.brand}
                placeholder="Product brand"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={monitor.price}
                placeholder="0.00"
                className="col-span-3"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
