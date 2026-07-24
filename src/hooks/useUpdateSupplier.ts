import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupplier } from "../services/supplierService";
import type { UpdateSupplierRequest } from "../types/supplier";

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateSupplierRequest;
    }) => updateSupplier(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
};