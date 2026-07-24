import CategoryForm from "./CategoryForm";
import type { Category } from "../../types/category";

interface Props {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
}

export default function AddCategoryModal({
  open,
  onClose,
  category,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {category ? "Edit Category" : "Add Category"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <CategoryForm
          category={category}
          onClose={onClose}
        />

      </div>

    </div>
  );
}