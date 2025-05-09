import { z } from "zod";


export const addProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  // Price input as STRING to avoid 0 stays in the input field, integer and positive number
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ invalid_type_error: "Price must be a number" })
      .int({ message: "Price must be an integer" })
      .min(0, "Price must be equal or greater than 0")
  ),
});

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;