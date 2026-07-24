import { useState } from "react";
import type { Category } from "../../types/category";
import { useCategories } from "../../hooks/useCategories";
import { useDebounce } from "../../hooks/useDebounce";
import AddCategoryModal from "../../components/categories/AddCategoryModal";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { useToggleCategory } from "../../hooks/useToggleCategory";

export default function Categories() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const deleteCategoryMutation = useDeleteCategory();
  const toggleCategoryMutation = useToggleCategory();

  const handleToggle = async (
  id: number,
  currentStatus: boolean
) => {
  try {
    await toggleCategoryMutation.mutateAsync({
      id,
      isActive: !currentStatus,
    });
  } catch (error) {
    console.error(error);
    alert("Failed to update category status.");
  }
};

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmed) return;

  try {
    await deleteCategoryMutation.mutateAsync(id);

    alert("Category deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete category.");
  }
};

  const { data, isLoading, isError } =
    useCategories(page, debouncedSearch);

  if (isLoading) return <p>Loading Categories...</p>;

  if (isError) return <p>Failed to load categories.</p>;

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500">
            Manage product categories
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Category
        </button>

      </div>

      <input
      autoFocus
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 mb-6 w-full"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {data?.items.map((category) => (

              <tr
                key={category.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {category.name}
                </td>

                <td className="p-4">
                  {category.description}
                </td>

                <td className="p-4">
  <button
    onClick={() =>
      handleToggle(category.id, category.isActive)
    }
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      category.isActive
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {category.isActive ? "Active" : "Inactive"}
  </button>
</td>

               <td className="p-4 flex gap-2">

  <button
    onClick={() => {
      setSelectedCategory(category);
      setOpenModal(true);
    }}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
  onClick={() => handleDelete(category.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
  Delete
</button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={!data?.hasPrevious}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Previous
        </button>

        <span>
          Page {data?.pageNumber} of {data?.totalPages}
        </span>

        <button
          disabled={!data?.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Next
        </button>

      </div>

      <AddCategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />

    </div>
  );
}