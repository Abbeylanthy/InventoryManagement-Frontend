export interface OrderAdmin {
  id: number;

  orderNumber: string;

  status: string;

  totalAmount: number;

  createdAt: string;

  paidAt?: string;

  customerName: string;

  customerEmail: string;
}

export interface PaginatedOrders {
  items: OrderAdmin[];

  pageNumber: number;
  pageSize: number;

  totalCount: number;
  totalPages: number;

  hasPrevious: boolean;
  hasNext: boolean;
}

export interface StaffDashboardSummary {
  totalProducts: number;
  lowStockProducts: number;
  pendingPurchaseOrders: number;
  receivedPurchaseOrders: number;
  totalOrders: number;
  paidOrders: number;
  stockInToday: number;
  stockOutToday: number;
}