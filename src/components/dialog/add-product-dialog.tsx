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
import { createProduct } from "@/services/action/create-product";
import { toast } from "sonner";
import type { Monitor } from "@/types/monitor";
import { fetchMonitorData } from "@/services/action/use-monitor-data";

type AddProductDialogProps = {
  setMonitors: (monitors: Monitor[]) => void;
  monitors: Monitor[];
  className?: string;
};

export function AddProductDialog({
  setMonitors,
  className,
}: AddProductDialogProps) {
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

    const onCreateMonitor = createProduct(monitorData);

    toast.promise(onCreateMonitor, {
      loading: "Creating monitor...",
      success: async () => {
        setOpen(false);
        setIsLoading(false);

        const fetchMonitors = await fetchMonitorData();
        setMonitors(fetchMonitors);

        return "Monitor created successfully";
      },
      error: (error) => {
        setIsLoading(false);
        const message =
          error?.response?.data?.message || "Failed to create monitor";
        return message;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory.
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
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
