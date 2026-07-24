export interface Feedback {
  id: number;
  customerName: string;
  productName: string;
  orderNumber: string;
  rating: number;
  subject: string;
  message: string;
  status: "Open" | "InProgress" | "Resolved";
  createdAt: string;
}

export interface PaginatedFeedback {
  items: Feedback[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}