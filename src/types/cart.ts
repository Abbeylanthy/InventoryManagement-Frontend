export interface CartAdmin {
  cartId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  grandTotal: number;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CartDetails {
  cartId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  grandTotal: number;
  items: CartItem[];
}

export interface PaginatedCarts {
  items: CartAdmin[];

  pageNumber: number;
  pageSize: number;

  totalCount: number;
  totalPages: number;

  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CartItemResponseDto {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CartResponseDto {
  cartId: number;
  items: CartItemResponseDto[];
  grandTotal: number;
}