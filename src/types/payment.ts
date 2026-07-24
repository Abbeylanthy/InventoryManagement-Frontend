export interface Payment {
  id: number;
  orderId: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  reference: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
}

export interface PaginatedPayments {
  items: Payment[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}