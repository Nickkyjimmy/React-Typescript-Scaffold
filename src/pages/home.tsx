import CustomerForm from "@/components/customers/customer-form";
import CustomerTable from "@/components/customers/table-customer";
import { useEffect, useState } from "react";
import { CustomerService } from "@/services/customer-service";
import type { User } from "@/types/user";

export default function HomePage() {
  const [customers, setCustomers] = useState<User[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await CustomerService.getCustomerData();
      setCustomers(response);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <CustomerForm onSuccess={fetchCustomers} />
      <CustomerTable customers={customers} fetchCustomer = {fetchCustomers} />
    </div>
  );
}
