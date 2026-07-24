import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toggleRoleStatus } from "../services/toggleRoleStatusService";

export const useToggleRoleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleRoleStatus,

    onSuccess: (response: any) => {
      toast.success(response?.message ?? "Role status updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
        error?.response?.data ??
        "Failed to update role."
      );
    },
  });
};