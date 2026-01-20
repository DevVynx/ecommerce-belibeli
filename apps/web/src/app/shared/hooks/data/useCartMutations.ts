import {
  type AddItemToCartRequest,
  AddItemToCartResponse,
  RemoveItemFromCartRequest,
  RemoveItemFromCartResponse,
  type UpdateCartItemQuantityRequest,
  type UpdateCartItemQuantityResponse,
} from "@repo/types/contracts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { cartService } from "@/app/shared/services/API/cart";

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<AddItemToCartResponse, AxiosError, AddItemToCartRequest>({
    mutationFn: (params: AddItemToCartRequest) => cartService.addItemToCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCartItemQuantityResponse, AxiosError, UpdateCartItemQuantityRequest>({
    mutationFn: (params: UpdateCartItemQuantityRequest) =>
      cartService.updateCartItemQuantity(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveItemFromCartResponse, AxiosError, RemoveItemFromCartRequest>({
    mutationFn: (params: RemoveItemFromCartRequest) => cartService.removeItemFromCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
