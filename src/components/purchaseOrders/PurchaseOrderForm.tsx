import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupplierDropdown } from "../../hooks/useSupplierDropdown";
import { useProductDropdown } from "../../hooks/useProductDropdown";

import {
  purchaseOrderSchema,
  type PurchaseOrderFormData,
} from "../../validations/purchaseOrderSchema";

import { useCreatePurchaseOrder } from "../../hooks/useCreatePurchaseOrder";

interface Props {
  onClose: () => void;
}

export default function PurchaseOrderForm({
  onClose,
}: Props) {

  const createPurchaseOrderMutation =
    useCreatePurchaseOrder();

    const { data: suppliersData } = useSupplierDropdown();

const { data: productsData } = useProductDropdown();

  const {
  register,
  control,
  handleSubmit,
  formState: { errors },
} = useForm<PurchaseOrderFormData>({
  resolver: zodResolver(purchaseOrderSchema),

  defaultValues: {
    supplierId: undefined,
    notes: "",
    items: [
      {
        productId: 0,
        orderedQuantity: 1,
        unitCost: 0,
      },
    ],
  },
});

  const { fields, append, remove } = useFieldArray({
  control,
  name: "items",
});

  const onSubmit = async (
    data: PurchaseOrderFormData
  ) => {
    try {
      await createPurchaseOrderMutation.mutateAsync(data);

      alert("Purchase Order created successfully!");

      onClose();

    } catch (error) {
      console.error(error);

      alert("Failed to create purchase order.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div>

        <label className="block mb-2 font-medium">
          Supplier
        </label>

        <select
  {...register("supplierId", {
    valueAsNumber: true,
  })}
  className="w-full border rounded-lg p-3"
>
  <option value="">
    Select Supplier
  </option>

  {suppliersData?.map((supplier) => (
  <option key={supplier.id} value={supplier.id}>
    {supplier.name}
  </option>
))}
</select>

        {errors.supplierId && (
          <p className="text-red-500 text-sm">
            {errors.supplierId.message}
          </p>
        )}

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Notes
        </label>

        <textarea
          {...register("notes")}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

  <div className="flex justify-between items-center mb-4">

    <h3 className="font-semibold text-lg">
      Products
    </h3>

    <button
      type="button"
      onClick={() =>
        append({
          productId: 0,
          orderedQuantity: 1,
          unitCost: 0,
        })
      }
      className="bg-green-600 text-white px-3 py-2 rounded"
    >
      + Add Product
    </button>

  </div>

<div className="grid grid-cols-4 gap-4 mb-2 font-semibold text-gray-700">
  <div>Product</div>
  <div>Ordered Qty</div>
  <div>Unit Cost</div>
  <div>Action</div>
</div>

  {fields.map((field, index) => (

    <div
      key={field.id}
      className="grid grid-cols-4 gap-4 mb-4"
    >

      <select
        {...register(
          `items.${index}.productId`,
          { valueAsNumber: true }
        )}
        className="border rounded p-2"
      >
        <option value="">
          Select Product
        </option>

        {productsData?.map((product) => (
  <option key={product.id} value={product.id}>
    {product.name}
  </option>
))}

      </select>

      <input
        type="number"
        placeholder="Enter Quantity"
        {...register(
          `items.${index}.orderedQuantity`,
          { valueAsNumber: true }
        )}
        className="border rounded p-2"
      />

      <input
        type="number"
        placeholder="Enter Unit Cost"
        {...register(
          `items.${index}.unitCost`,
          { valueAsNumber: true }
        )}
        className="border rounded p-2"
      />

      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-red-600 text-white rounded"
      >
        Remove
      </button>

    </div>

  ))}

</div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        Create Purchase Order
      </button>

    </form>
  );
}