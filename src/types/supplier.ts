export interface Supplier {
  id: number;
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address?: string;
}

export interface PaginatedSuppliers {
  items: Supplier[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CreateSupplierRequest {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address?: string;
}

export interface SupplierDropdown {
    id: number;
    name: string;
}

export interface UpdateSupplierRequest
  extends CreateSupplierRequest {}