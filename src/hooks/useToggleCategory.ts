import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCategoryActive } from "../services/categoryService";

export const useToggleCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: number;
      isActive: boolean;
    }) => toggleCategoryActive(id, isActive),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};