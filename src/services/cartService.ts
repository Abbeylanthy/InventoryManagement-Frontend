import api from "../api/axios";
import type { CartDetails, PaginatedCarts } from "../types/cart";

export const getAllCarts = async (
  page = 1
): Promise<PaginatedCarts> => {
  const response = await api.get("/cart/all", {
    params: {
      pageNumber: page,
      pageSize: 10,
    },
  });

  return response.data;
};

export const getCartById = async (
  cartId: number
): Promise<CartDetails> => {
  const response = await api.get(`/cart/${cartId}`);
  return response.data;
};

export const getMyCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};