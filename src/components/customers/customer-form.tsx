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

const customerFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  balance: z.number().min(0, { message: "Balance must be a positive number" }),
});

type CustomerFormProps = {
  isUpdated: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
  curCustomer: User | undefined;
  setCurCustomer: (customer: User) => void;
  onSuccess: () => void;
};

export default function CustomerForm({ isUpdated, setIsUpdated, curCustomer, setCurCustomer, onSuccess }: CustomerFormProps) {
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      balance: 0,
    },
  });

  useEffect(() => {
    if (isUpdated) {
      form.reset({
        firstName: curCustomer.firstName,
        lastName: curCustomer.lastName,
        email: curCustomer.email,
        balance: curCustomer.balance,
      });
    } else {
      form.reset();
    }
  }, [isUpdated, curCustomer])

  const onSubmit = (data: z.infer<typeof customerFormSchema>) => {
    if (isUpdated) {
      CustomerService.updateCustomer(curCustomer.id, data)
        .then(() => {
          onSuccess();
          setIsUpdated(false);
          form.reset(
            {
              firstName: "",
              lastName: "",
              email: "",
              balance: 0,
            }
          );
          alert("Customer updated successfully.");

          // console.log("Customer before update:", curCustomer);
          // setCurCustomer(undefined); // Clear the current customer after update
          // console.log("Customer after update:", curCustomer);
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    }
    else {
      CustomerService.createCustomer(data)
        .then(() => {
          onSuccess();
          form.reset();
        })
        .catch((error) => {
          console.error("Error creating customer:", error);
        });

    }
  };

  return (
    <div className="max-w-md space-y-4 mx-auto">
      <Card className="w-full max-w-sm">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Balance" {...field} onChange={(e) => {
                        field.onChange(e.target.valueAsNumber)
                      }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Move to the right corner */}
              <div className="flex justify-end">
                <Button type="submit">{isUpdated === true ? "Update Customer" : "Create Customer"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
