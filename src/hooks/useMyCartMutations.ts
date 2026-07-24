import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../services/cartMutationService";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};

export const useUpdateMyCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCart,

    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({
        queryKey: ["my-cart"],
      });

      const previousCart =
        queryClient.getQueryData<any>([
          "my-cart",
        ]);

      queryClient.setQueryData(
        ["my-cart"],
        (old: any) => {
          if (!old) return old;

          const updatedItems = old.items.map(
            (item: any) => {
              if (item.productId !== productId)
                return item;

              return {
                ...item,
                quantity,
                totalPrice:
                  quantity * item.unitPrice,
              };
            }
          );

          const grandTotal = updatedItems.reduce(
            (sum: number, item: any) =>
              sum + item.totalPrice,
            0
          );

          return {
            ...old,
            items: updatedItems,
            grandTotal,
          };
        }
      );

      return { previousCart };
    },

    onError: (
      _err,
      _variables,
      context
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ["my-cart"],
          context.previousCart
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-cart"],
      });
    },
  });
};

export const useRemoveMyCartItem = (
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: ["my-cart"],
      });

      const previousCart =
        queryClient.getQueryData<any>([
          "my-cart",
        ]);

      queryClient.setQueryData(
        ["my-cart"],
        (old: any) => {
          if (!old) return old;

          const updatedItems = old.items.filter(
            (item: any) =>
              item.productId !== productId
          );

          const grandTotal = updatedItems.reduce(
            (sum: number, item: any) =>
              sum + item.totalPrice,
            0
          );

          return {
            ...old,
            items: updatedItems,
            grandTotal,
          };
        }
      );

      return { previousCart };
    },

    onError: (
      _err,
      _variables,
      context
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ["my-cart"],
          context.previousCart
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-cart"],
      });
    },
  });
};

export const useClearMyCart = (
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["my-cart"],
      });

      const previousCart =
        queryClient.getQueryData<any>([
          "my-cart",
        ]);

      queryClient.setQueryData(
        ["my-cart"],
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            items: [],
            grandTotal: 0,
          };
        }
      );

      return { previousCart };
    },

    onError: (
      _err,
      _variables,
      context
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ["my-cart"],
          context.previousCart
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-cart"],
      });
    },
  });
};