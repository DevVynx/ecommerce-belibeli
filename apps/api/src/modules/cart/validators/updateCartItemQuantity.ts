import z from "zod";
import { UpdateCartItemQuantity } from "@repo/types/contracts";
import { validation } from "@/shared/middlewares/validation";

const body: z.ZodType<UpdateCartItemQuantity> = z.object({
  cartItemId: z.coerce.number("Valor inválido.").positive("O número deve ser maior que zero."),
  quantity: z.coerce.number("Valor inválido."),
});

export const updateCartItemQuantity = validation({ body });
