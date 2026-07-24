export interface PurchaseOrderItem {
  productId: number;
  productName: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: number;
  purchaseOrderNumber: string;

  supplierId: number;
  supplierName: string;

  status: string;

  createdAt: string;
  approvedAt?: string;
  receivedAt?: string;

  notes?: string;

  items: PurchaseOrderItem[];
}

export interface PaginatedPurchaseOrders {
  items: PurchaseOrder[];

  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CreatePurchaseOrderItemRequest {
  productId: number;
  orderedQuantity: number;
  unitCost: number;
}

export interface CreatePurchaseOrderRequest {
  supplierId: number;

  notes?: string;

  items: CreatePurchaseOrderItemRequest[];
}