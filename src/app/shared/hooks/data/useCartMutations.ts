import { cartService } from "@/shared/services/API/cart";
import type { CreateCartParams } from "@/shared/types/Params";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCartParams) => cartService.createCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
