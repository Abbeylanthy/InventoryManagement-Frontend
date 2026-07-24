import api from "../api/axios";
import type {
  PaginatedCategories,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category";

// GET ALL
export const getCategories = async (
  page: number = 1,
  search: string = "",
  isActive?: boolean
):  Promise<PaginatedCategories> => {
  const response = await api.get(
    `/Categories?pageNumber=${page}&pageSize=10&search=${search}&isActive=${isActive ?? ""}`
  );

  return response.data;
};

// CREATE
export const createCategory = async (
  data: CreateCategoryRequest
) => {
  const response = await api.post("/Categories", data);
  return response.data;
};

// UPDATE
export const updateCategory = async (
  id: number,
  data: UpdateCategoryRequest
) => {
  const response = await api.put(`/Categories/${id}`, data);
  return response.data;
};

// DELETE
export const deleteCategory = async (id: number) => {
  await api.delete(`/Categories/${id}`);
};

// TOGGLE ACTIVE
export const toggleCategoryActive = async (
  id: number,
  isActive: boolean
) => {
  await api.patch(
    `/Categories/${id}/toggle-active?isActive=${isActive}`
  );
};

export const getCategoryDropdown = async () => {
  const response = await api.get("/Categories/dropdown");
  return response.data;
};