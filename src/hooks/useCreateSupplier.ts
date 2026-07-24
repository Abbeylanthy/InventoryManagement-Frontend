import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../services/supplierService";

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
};