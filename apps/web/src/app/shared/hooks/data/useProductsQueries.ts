import { useQuery } from "@tanstack/react-query";

import { productService } from "@/app/shared/services/API/products";

export const useFindProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.findAllProducts,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
};
