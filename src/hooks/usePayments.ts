import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/paymentService";

export const usePayments = (
  page = 1,
  search = "",
  status = ""
) => {
  return useQuery({
    queryKey: ["payments", page, search, status],
    queryFn: () => getPayments(page, search, status),
  });
};