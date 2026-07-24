import api from "../api/axios";
import type { AddToCartRequest } from "../types/addToCart";

export const addToCart = async (
  dto: AddToCartRequest
) => {
  const response = await api.post(
    "/cart/add",
    dto
  );

  return response.data;
};

export const updateCart = async (dto: {
  productId: number;
  quantity: number;
}) => {
  const response = await api.put(
    "/cart/update",
    dto
  );

  return response.data;
};

export const removeCartItem = async (
  productId: number
) => {
  const response = await api.delete(
    `/cart/remove/${productId}`
  );

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");

  return response.data;
};