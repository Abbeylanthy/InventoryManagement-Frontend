import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier } from "../services/supplierService";

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
};