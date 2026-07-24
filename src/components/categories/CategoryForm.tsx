import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  categorySchema,
  type CategoryFormData,
} from "../../validations/categorySchema";

import type { Category } from "../../types/category";

import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";

interface Props {
  category?: Category | null;
  onClose: () => void;
}

export default function CategoryForm({
  category,
  onClose,
}: Props) {
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description ?? "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (category) {
        await updateCategoryMutation.mutateAsync({
          id: category.id,
          data,
        });

        alert("Category updated successfully!");
      } else {
        await createCategoryMutation.mutateAsync(data);

        alert("Category created successfully!");
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
          Category Name
        </label>

        <input
          {...register("name")}
          className="w-full border rounded-lg p-3"
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
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        {category ? "Save Category" : "Create Category"}
      </button>
    </form>
  );
}