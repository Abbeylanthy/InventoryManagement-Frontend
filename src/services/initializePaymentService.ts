import api from "../api/axios";

export interface InitializePaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  } | null;
}

export const initializePayment = async (
  orderId: number
): Promise<InitializePaymentResponse> => {
  const response = await api.post(
    `/payments/initialize/${orderId}`
  );

  return response.data;
};