import { useQuery } from "@tanstack/react-query";
import { getWithdrawals } from "../services/walletService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveWithdrawal } from "../services/walletService";

export const useWithdrawals = (
  page: number,
  search: string,
  status: string
) => {
  return useQuery({
    queryKey: [
      "withdrawals",
      page,
      search,
      status,
    ],
    queryFn: () =>
      getWithdrawals(page, search, status),
  });
};

export const useApproveWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveWithdrawal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["withdrawals"],
      });

      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });
};