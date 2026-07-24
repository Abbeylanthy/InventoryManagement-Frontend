import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),

  description: z.string().optional(),

  price: z.coerce
    .number()
    .positive("Price must be greater than zero"),

  quantity: z.coerce
    .number()
    .min(0, "Quantity cannot be negative"),

  sku: z.string().optional(),


  categoryId: z.coerce
    .number()
    .min(1, "Select a category"),

  supplierId: z.coerce
    .number()
    .min(1, "Select a supplier"),

  threshold: z.coerce
    .number()
    .min(0, "Threshold cannot be negative"),
});

export type ProductFormData = z.output<typeof productSchema>;