import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CreateMonitorInput } from "@/types/monitor"
import MonitorForm from "./monitor-add-form"
import { DialogClose } from "@radix-ui/react-dialog"

type AddDialogProps = {
  indexPage: number;
  onSuccess: (index: number) => void;
}

export function AddDialog({
  indexPage,
  onSuccess
}: AddDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white font-semibold w-full" variant="outline">Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <MonitorForm indexPage={indexPage} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
