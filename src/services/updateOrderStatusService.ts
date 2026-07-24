import api from "../api/axios";

export const updateOrderStatus = async (
  orderId: number,
  status: string
) => {
  const response = await api.put(
    `/orders/${orderId}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return response.data;
};