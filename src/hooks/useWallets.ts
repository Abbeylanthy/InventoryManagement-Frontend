import { useQuery } from "@tanstack/react-query";
import { getWallets } from "../services/walletAdminService";

export const useWallets = (
  page: number,
  search: string
) => {
  return useQuery({
    queryKey: ["wallets", page, search],
    queryFn: () => getWallets(page, search),
  });
};