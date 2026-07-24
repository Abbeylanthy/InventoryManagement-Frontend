import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "../services/walletService";

export const useMyTransactions = (
  pageNumber = 1,
  pageSize = 10,
  type?: string
) => {
  return useQuery({
    queryKey: [
      "my-wallet-transactions",
      pageNumber,
      pageSize,
      type,
    ],
    queryFn: () =>
      getMyTransactions(pageNumber, pageSize, type),
  });
};