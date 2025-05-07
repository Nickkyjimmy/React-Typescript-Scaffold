import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import { Button } from "../ui/button";
import { CustomerService } from "@/services/customer-service";

type CustomerTableProps = {
  customers: User[];
  fetchCustomer: () => void;
};

export default function CustomerTable({
  customers,
  fetchCustomer,
}: CustomerTableProps) {
  const handleDelete = async (customerId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        await CustomerService.deleteCustomer(customerId);
        alert("Customer deleted successfully.");
        fetchCustomer(); // Refresh the customer list after deletion
        // Optionally, you can refresh the customer list here
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <Table className="w-[75%] mx-auto">
      <TableCaption>A list of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.id}</TableCell>
            <TableCell>{customer.firstName}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell className="text-right">{customer.balance}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleDelete(customer.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
