export interface CheckoutRequest {
  cartId: number;
  shippingAddress: string;
  notes?: string;
}

export interface CheckoutResponse {
  orderId: number;
  message: string;
}