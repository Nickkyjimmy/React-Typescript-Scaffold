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
import { CustomerService } from "@/services/customer-service";

const customerFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  balance: z.number().min(0, { message: "Balance must be a positive number" }),
});

type CustomerFormProps = {
  onSuccess: () => void;
};

export default function CustomerForm({ onSuccess }: CustomerFormProps) {
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      balance: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof customerFormSchema>) => {
    CustomerService.createCustomer(data)
      .then(() => {
        onSuccess();
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating customer:", error);
      });
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
                      <Input type="number" placeholder="Balance" {...field} onChange={(e)=> {            
                        field.onChange(e.target.valueAsNumber)
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Move to the right corner */}
              <div className="flex justify-end">
                <Button type="submit">Create Customer</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
