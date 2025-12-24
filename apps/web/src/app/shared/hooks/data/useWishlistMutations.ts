import {
  AddItemToWishlistRequest,
  AddItemToWishlistResponse,
  RemoveItemFromWishlistRequest,
  RemoveWishlistItemResponse,
} from "@repo/types/contracts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { wishlistService } from "@/app/shared/services/API/wishlist";

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<AddItemToWishlistResponse, AxiosError, AddItemToWishlistRequest>({
    mutationFn: (params: AddItemToWishlistRequest) => wishlistService.addItemToWishlist(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveWishlistItemResponse, AxiosError, RemoveItemFromWishlistRequest>({
    mutationFn: (params: RemoveItemFromWishlistRequest) =>
      wishlistService.removeItemToWishlist(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
