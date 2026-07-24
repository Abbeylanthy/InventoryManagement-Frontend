import api from "../api/axios";

export interface CreateFeedbackRequest {
  orderId: number;
  productId: number;
  rating: number;
  subject: string;
  message: string;
}

export const createFeedback = async (
  request: CreateFeedbackRequest
) => {
  const response = await api.post(
    "/feedback",
    request
  );

  return response.data;
};