import api from "../api/axios";

import type {
  PaginatedSuppliers,
  CreateSupplierRequest,
  UpdateSupplierRequest,
} from "../types/supplier";

import type {
  SupplierDropdown,
  // other supplier types...
} from "../types/supplier";

export const getSupplierDropdown = async (): Promise<SupplierDropdown[]> => {
    const response = await api.get<SupplierDropdown[]>("/Supplier/dropdown");
    return response.data;
};

// GET ALL
export const getSuppliers = async (
  page: number = 1,
  search: string = ""
): Promise<PaginatedSuppliers> => {
  const response = await api.get(
    `/Supplier?pageNumber=${page}&pageSize=10&search=${search}`
  );

  return response.data;
};

// CREATE
export const createSupplier = async (
  data: CreateSupplierRequest
) => {
  const response = await api.post("/Supplier", data);
  return response.data;
};

// UPDATE
export const updateSupplier = async (
  id: number,
  data: UpdateSupplierRequest
) => {
  const response = await api.put(`/Supplier/${id}`, data);
  return response.data;
};

// DELETE
export const deleteSupplier = async (
  id: number
) => {
  await api.delete(`/Supplier/${id}`);
};