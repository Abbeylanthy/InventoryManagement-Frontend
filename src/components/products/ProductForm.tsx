import { useCategoryDropdown } from "../../hooks/useCategoryDropdown";
import { useSupplierDropdown } from "../../hooks/useSupplierDropdown";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import type { SupplierDropdown } from "../../types/supplier";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateProduct } from "../../hooks/useUpdateProduct";

import type { Product } from "../../types/product";

import type { Category } from "../../types/category";

import {
  productSchema,
  type ProductFormData,
} from "../../validations/productSchema";

interface ProductFormProps {
  product?: Product | null;
  onClose?: () => void;
}

export default function ProductForm({
  product,
  onClose,
}: ProductFormProps) {
  const { data: categories } = useCategoryDropdown();

  const { data: suppliers } = useSupplierDropdown();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ProductFormData>({
  resolver: zodResolver(productSchema),
});

useEffect(() => {
  if (product) {
    reset({
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      quantity: product.quantity,
      sku: product.sku ?? "",
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      threshold: product.threshold ?? 0,
    });
  } else {
    reset({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      sku: "",
      categoryId: 0,
      supplierId: 0,
      threshold: 0,

    });
  }
}, [product, reset]);
  const onSubmit = async (data: ProductFormData) => {
  try {
    if (product) {
      await updateProductMutation.mutateAsync({
        id: product.id,
        data,
      });

      alert("Product updated successfully!");
    } else {
      await createProductMutation.mutateAsync(data);

      alert("Product created successfully!");
    }

    reset();

    if (onClose) {
      onClose();
    }
  } catch (error) {
    console.error(error);
    alert("Operation failed.");
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Product Name
        </label>

        <input
          {...register("name")}
          className="w-full border rounded-lg p-3"
          placeholder="Enter product name"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          {...register("description")}
          className="w-full border rounded-lg p-3"
          rows={3}
          placeholder="Enter description"
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Price
          </label>

          <input
            type="number"
            {...register("price")}
            className="w-full border rounded-lg p-3"
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Quantity
          </label>

          <input
            type="number"
            {...register("quantity")}
            className="w-full border rounded-lg p-3"
          />

          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            SKU
          </label>

          <input
            {...register("sku")}
            className="w-full border rounded-lg p-3"
          />

          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sku.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Threshold
          </label>

          <input
            type="number"
            {...register("threshold")}
            className="w-full border rounded-lg p-3"
          />

          {errors.threshold && (
            <p className="text-red-500 text-sm mt-1">
              {errors.threshold.message}
            </p>
          )}
        </div>
      </div>
            <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          {...register("categoryId", { valueAsNumber: true })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Category</option>

         { categories?.map((category: Category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Supplier
        </label>

        <select
          {...register("supplierId", { valueAsNumber: true })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Supplier</option>

          {suppliers?.map((supplier: SupplierDropdown) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </option>
          ))}
        </select>

        {errors.supplierId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.supplierId.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Clear
        </button>

        <button
          type="submit"
          disabled={createProductMutation.isPending}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {createProductMutation.isPending
            ? "Saving..."
            : "Save Product"}
        </button>
      </div>
    </form>
  );
}