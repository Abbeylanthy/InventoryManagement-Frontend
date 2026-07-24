import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrders } from "../services/purchaseOrderService";

export const usePurchaseOrders = (
  page = 1,
  search = "",
  status = "",
  supplierId?: number,
  fromDate?: string,
  toDate?: string
) => {
  return useQuery({
    queryKey: [
      "purchaseOrders",
      page,
      search,
      status,
      supplierId,
      fromDate,
      toDate,
    ],

    queryFn: () =>
      getPurchaseOrders(
        page,
        search,
        status,
        supplierId,
        fromDate,
        toDate
      ),
  });
};