import api from "../api/axios";

import type {
  PaginatedPurchaseOrders,
  CreatePurchaseOrderRequest,
  PurchaseOrder,
} from "../types/purchaseOrder";



// GET ALL
export const getPurchaseOrders = async (
  page: number = 1,
  search: string = "",
  status?: string,
  supplierId?: number,
  fromDate?: string,
  toDate?: string
): Promise<PaginatedPurchaseOrders> => {
  const response = await api.get("/purchase-orders", {
    params: {
  pageNumber: page,
  pageSize: 10,
  search,
  status,
  supplierId,
  fromDate,
  toDate,
},
  });

  return response.data;
};

// CREATE
export const createPurchaseOrder = async (
  data: CreatePurchaseOrderRequest
) => {
  const response = await api.post(
    "/purchase-orders",
    data
  );

  return response.data;
};

// GET BY ID
export const getPurchaseOrderById = async (
  id: number
): Promise<PurchaseOrder> => {
  const response = await api.get<PurchaseOrder>(
    `/purchase-orders/${id}`
  );

  return response.data;
};

// APPROVE
export const approvePurchaseOrder = async (
  id: number
) => {
  const response = await api.post(
    `/purchase-orders/${id}/approve`
  );

  return response.data;
};

// RECEIVE
export const receivePurchaseOrder = async (
  id: number,
  items: {
    productId: number;
    quantityReceived: number;
  }[]
) => {
  const response = await api.post(
    `/purchase-orders/${id}/receive`,
    { items }
  );

  return response.data;
};

// CANCEL
export const cancelPurchaseOrder = async (
  id: number
) => {
  const response = await api.post(
    `/purchase-orders/${id}/cancel`
  );

  return response.data;
};