import { z } from "zod";

export const purchaseOrderItemSchema = z.object({
  productId: z.number(),

  orderedQuantity: z
    .number()
    .min(1, "Quantity must be greater than zero"),

  unitCost: z
    .number()
    .min(0.01, "Unit cost must be greater than zero"),
});

export const purchaseOrderSchema = z.object({
  supplierId: z.number(),

  notes: z.string().optional(),

  items: z
    .array(purchaseOrderItemSchema)
    .min(1, "Add at least one product"),
});

export type PurchaseOrderFormData =
  z.infer<typeof purchaseOrderSchema>;