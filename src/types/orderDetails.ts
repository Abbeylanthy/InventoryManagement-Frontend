export interface OrderItem {
  productId: number;
  productName: string;

  quantity: number;

  unitPrice: number;

  totalPrice: number;
}

export interface OrderDetails {
  id: number;

  orderNumber: string;

  status: string;

  totalAmount: number;

  shippingAddress: string;

  notes?: string;

  createdAt: string;

  items: OrderItem[];
}