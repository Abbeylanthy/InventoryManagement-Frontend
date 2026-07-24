import api from "../api/axios";
import type { OrderDetails } from "../types/orderDetails";

export const getOrderDetails = async (
  id: number
): Promise<OrderDetails> => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};