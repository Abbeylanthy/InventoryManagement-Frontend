import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductActive } from "../services/productService";

export const useToggleProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: number;
      isActive: boolean;
    }) => toggleProductActive(id, isActive),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};