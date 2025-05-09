import CustomerForm from "@/components/customers/customer-form";
import CustomerTable from "@/components/customers/table-customer";
import { useEffect, useState } from "react";
import { CustomerService } from "@/services/product-service/customer-service";
import type { User } from "@/types/user";
import MonitorTable from "@/components/monitors/table-monitor";
import type { Monitor } from "@/types/monitor";
import { MonitorService } from "@/services/product-service/monitor-service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [curCustomer, setCurCustomer] = useState<User | undefined>();

  const [monitors, setMonitors] = useState<Monitor[]>([])
  const [maxPage, setMaxPage] = useState<number>(0)
  const [indexPage, setIndexPage] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("Id")
  
  const fetchCustomers = async () => {}


  const fetchMonitors = async (index: number) => {
    try {
      const response = await MonitorService.getAllMonitors(index, 5, sortBy);
      setMonitors(response.content);
      setMaxPage(response.totalPages)
      setIndexPage(index)
    } catch (error) {
      console.error("Error fetching monitors data:", error);
    }
  }

  useEffect(() => {
    fetchMonitors(indexPage)
  }, [sortBy])

  return (
    <div className="space-y-6">
      {/* <CustomerForm isUpdated={isUpdated} setIsUpdated={setIsUpdated} curCustomer={curCustomer} setCurCustomer={setCurCustomer} onSuccess={fetchCustomers} /> */}
      {/* <CustomerTable setIsUpdated={setIsUpdated} setCurCustomer={setCurCustomer} customers={customers} fetchCustomer = {fetchCustomers} /> */}
      <div className="flex justify-end">
        <Select
          onValueChange={(value) => {
            setSortBy(value)
            fetchMonitors(indexPage)
          }}>

          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Product By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Id">ID</SelectItem>
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="Price">Price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <MonitorTable monitors={monitors} fetchMonitor={fetchMonitors} maxPage={maxPage} indexPage={indexPage} setIndexPage={setIndexPage} setMaxPage={setMaxPage} />
    </div>
  );
}
