export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  isActive: boolean;
  sku?: string;
  categoryId: number;
  supplierId: number;
  threshold?: number;
  category?: string;
}

export interface PaginatedProducts {
  items: Product[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sku?: string;
  categoryId: number;
  supplierId: number;
  threshold: number;
}

export interface ProductDropdown {
    id: number;
    name: string;
}