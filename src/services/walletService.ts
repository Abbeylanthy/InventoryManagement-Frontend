import api from "../api/axios";
import type {
  WalletResponse,
  WithdrawRequest,
  PaginatedWithdrawals,
} from "../types/wallet";


export const getMyWallet = async (): Promise<WalletResponse> => {
  const { data } = await api.get("/wallet");
  return data;
};

export const getWalletBalance = async () => {
  const { data } = await api.get("/wallet/balance");
  return data;
};

export const requestWithdrawal = async (
  dto: WithdrawRequest
) => {
  const { data } = await api.post("/wallet/withdraw", dto);
  return data;
};

export const getMyTransactions = async (
  pageNumber = 1,
  pageSize = 10,
  type?: string
) => {
  const response = await api.get("/wallet/transactions", {
    params: {
      pageNumber,
      pageSize,
      type,
    },
  });

  return response.data;
};

export const getWalletTransactions = async (
  walletId: number,
  page = 1,
  type?: string
) => {
  const response = await api.get(
    `/wallet/${walletId}/transactions`,
    {
      params: {
        pageNumber: page,
        pageSize: 10,
        type,
      },
    }
  );

  return response.data;
};

export const getWithdrawals = async (
  page = 1,
  search = "",
  status = ""
): Promise<PaginatedWithdrawals> => {
  const response = await api.get("/wallet/withdrawals", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
      status,
    },
  });

  return response.data;
};

export const approveWithdrawal = async (
  id: number
) => {
  const response = await api.post(
    `/wallet/admin/withdrawals/${id}/approve`
  );

  return response.data;
};