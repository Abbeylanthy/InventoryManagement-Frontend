import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  supplierSchema,
  type SupplierFormData,
} from "../../validations/supplierSchema";

import type { Supplier } from "../../types/supplier";

import { useCreateSupplier } from "../../hooks/useCreateSupplier";
import { useUpdateSupplier } from "../../hooks/useUpdateSupplier";

interface Props {
  supplier?: Supplier | null;
  onClose: () => void;
}

export default function SupplierForm({
  supplier,
  onClose,
}: Props) {
  const createSupplierMutation = useCreateSupplier();
  const updateSupplierMutation = useUpdateSupplier();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  });

  useEffect(() => {
    if (supplier) {
      reset({
        name: supplier.name,
        contactEmail: supplier.contactEmail,
        phoneNumber: supplier.phoneNumber,
        address: supplier.address ?? "",
      });
    } else {
      reset({
        name: "",
        contactEmail: "",
        phoneNumber: "",
        address: "",
      });
    }
  }, [supplier, reset]);

  const onSubmit = async (data: SupplierFormData) => {
    try {
      if (supplier) {
        await updateSupplierMutation.mutateAsync({
          id: supplier.id,
          data,
        });

        alert("Supplier updated successfully!");
      } else {
        await createSupplierMutation.mutateAsync(data);

        alert("Supplier created successfully!");
      }

      reset();
      onClose();
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
          Supplier Name
        </label>

        <input
          {...register("name")}
          className="w-full border rounded-lg p-3"
        />

        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Contact Email
        </label>

        <input
          {...register("contactEmail")}
          className="w-full border rounded-lg p-3"
        />

        {errors.contactEmail && (
          <p className="text-red-500 text-sm">
            {errors.contactEmail.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          {...register("phoneNumber")}
          className="w-full border rounded-lg p-3"
        />

        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Address
        </label>

        <textarea
          {...register("address")}
          className="w-full border rounded-lg p-3"
        />

        {errors.address && (
          <p className="text-red-500 text-sm">
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        {supplier ? "Save Supplier" : "Create Supplier"}
      </button>
    </form>
  );
}