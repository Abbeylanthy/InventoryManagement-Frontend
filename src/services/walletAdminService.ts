import api from "../api/axios";
import type { PaginatedWallets } from "../types/wallet";
import type { WalletAdmin } from "../types/wallet";

export const getWallets = async (
  page = 1,
  search = ""
): Promise<PaginatedWallets> => {
  const response = await api.get("/wallet/all", {
    params: {
      pageNumber: page,
      pageSize: 10,
      search,
    },
  });

  return response.data;
};

export const getWalletById = async (
  walletId: number
): Promise<WalletAdmin> => {
  const response = await api.get(`/wallet/${walletId}`);
  return response.data;
};