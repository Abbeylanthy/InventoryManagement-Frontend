import api from "../api/axios";

export const cancelOrder = async (
  orderId: number
) => {
  const response = await api.put(
    `/orders/${orderId}/cancel`
  );

  return response.data;
};