import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" })
    .refine((val) => val.endsWith(".com") || val.endsWith(".vn"), {
      message: "Email must end with .com or .vn",
    }),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
