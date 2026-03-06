import { useQuery } from "@tanstack/react-query";

import { cartService } from "@/shared/actions/cart";

export const useFindCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.findCart,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (oldData) => oldData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useFindCartItems = () => {
  return useQuery({
    queryKey: ["cart", "items"],
    queryFn: cartService.findCartItems,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (oldData) => oldData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
