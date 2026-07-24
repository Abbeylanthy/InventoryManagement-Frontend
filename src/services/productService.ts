import api from "../api/axios";

import type {
  PaginatedProducts,
  CreateProductRequest,
} from "../types/product";

import type {
  ProductDropdown,
  // other product types...
} from "../types/product";

export const getProductDropdown = async (): Promise<ProductDropdown[]> => {
    const response = await api.get<ProductDropdown[]>("/Products/dropdown");
    return response.data;
};

export const getProducts = async (
  page: number = 1,
  search: string = ""
): Promise<PaginatedProducts> => {
  const response = await api.get(
    `/Products?pageNumber=${page}&pageSize=10&search=${search}`
  );

  

  return response.data;
};

export const createProduct = async (
  data: CreateProductRequest
) => {
  const response = await api.post("/Products", data);
  return response.data;
};

export const updateProduct = async (
  id: number,
  data: CreateProductRequest
) => {
  const response = await api.put(`/Products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/Products/${id}`);
};

export const toggleProductActive = async (
  id: number,
  isActive: boolean
) => {
  await api.patch(
    `/Products/${id}/toggle-active?isActive=${isActive}`
  );
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};