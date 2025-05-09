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
import type { CreateMonitorInput, Monitor } from "@/types/monitor"
import MonitorForm from "./monitor-add-form"
import { DialogClose } from "@radix-ui/react-dialog"
import UpdateMonitorForm from "./monitor-update-form"

type UpdateDialogProps = {
  indexPage: number;
  monitor: Monitor
  onSuccess: (index: number) => void;
}

export function UpdateDialog({
  indexPage,
  monitor,
  onSuccess
}: UpdateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white font-semibold w-full" variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UpdateMonitorForm indexPage={indexPage} monitor={monitor} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
