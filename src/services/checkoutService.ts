import api from "../api/axios";
import type {
  CheckoutRequest,
  CheckoutResponse,
} from "../types/checkout";

export const checkout = async (
  dto: CheckoutRequest
): Promise<CheckoutResponse> => {
  const response = await api.post(
    "/checkout",
    dto
  );

  return response.data;
};