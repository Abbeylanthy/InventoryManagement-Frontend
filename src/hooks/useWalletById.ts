import { useQuery } from "@tanstack/react-query";
import { getWalletById } from "../services/walletAdminService";

export const useWalletById = (
  walletId: number | null
) => {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: () => getWalletById(walletId!),
    enabled: !!walletId,
  });
};