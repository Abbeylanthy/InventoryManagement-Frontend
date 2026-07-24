import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),

  contactEmail: z
    .string()
    .email("Invalid email address"),

  phoneNumber: z.string().min(1, "Phone number is required"),

  address: z.string().optional(),
});

export type SupplierFormData =
  z.infer<typeof supplierSchema>;