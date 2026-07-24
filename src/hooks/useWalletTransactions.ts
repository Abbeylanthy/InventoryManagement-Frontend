import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions } from "../services/walletService";

export const useWalletTransactions = (
  walletId: number,
  pageNumber = 1,
  type?: string
) => {
  return useQuery({
    queryKey: [
      "wallet-transactions",
      walletId,
      pageNumber,
      type,
    ],
    queryFn: () =>
      getWalletTransactions(
        walletId,
        pageNumber,
        type
      ),
    enabled: walletId > 0,
  });
};