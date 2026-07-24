import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMyWallet,
  getWalletBalance,
  requestWithdrawal,
} from "../services/walletService";

export const useMyWallet = () => {
  return useQuery({
    queryKey: ["my-wallet"],
    queryFn: getMyWallet,
  });
};

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: getWalletBalance,
  });
};

export const useRequestWithdrawal = () => {
  return useMutation({
    mutationFn: requestWithdrawal,
  });
};