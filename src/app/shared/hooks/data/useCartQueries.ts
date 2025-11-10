import { cartService } from "@/shared/services/API/cart";
import { useQuery } from "@tanstack/react-query";

export const useFindCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.findCart,
  });
};
