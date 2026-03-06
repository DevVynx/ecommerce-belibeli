import { useQuery } from "@tanstack/react-query";

import { wishlistService } from "@/shared/actions/wishlist";

export const useFindWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistService.findWishlist,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (oldData) => oldData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
