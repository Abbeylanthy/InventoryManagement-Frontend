export interface WalletTransaction {
  amount: number;
  reason: string;
  type: string;
  createdAt: string;
}

export interface WalletResponse {
  balance: number;
  transactions: WalletTransaction[];
}

export interface WithdrawRequest {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WalletAdmin {
  walletId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  balance: number;
  transactionCount: number;
}

export interface WalletTransactionAdmin {
  id: number;
  walletId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  type: string;
  reason: string;
  createdAt: string;
}

export interface Withdrawal {
  id: number;
  amount: number;
  status: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  customerName: string;
  createdAt: string;
}

export interface WalletTransactionDto {
  amount: number;
  reason: string;
  type: string;
  createdAt: string;
}

export interface PaginatedWalletTransactions {
  items: WalletTransactionDto[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
export interface PaginatedWallets {
  items: WalletAdmin[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedWithdrawals {
  items: Withdrawal[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}