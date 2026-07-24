export interface StockHistory {
  productId: number;
  productName: string;

  quantityChanged: number;
  previousQuantity: number;
  newQuantity: number;

  actionType: string;
  note?: string;

  createdAt: string;

  performedBy: string;
}

export interface PaginatedStockHistory {
  items: StockHistory[];

  pageNumber: number;
  pageSize: number;

  totalCount: number;
  totalPages: number;

  hasPrevious: boolean;
  hasNext: boolean;
}