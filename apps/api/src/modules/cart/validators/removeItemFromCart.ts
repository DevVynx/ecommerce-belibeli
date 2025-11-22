import z from "zod";
import { RemoveItemFromCart } from "@repo/types/contracts";
import { validation } from "@/shared/middlewares/validation";

const body: z.ZodType<RemoveItemFromCart> = z.object({
  cartItemId: z.coerce.number("Valor inválido.").positive("O número deve ser maior que zero."),
});

export const removeItemFromCart = validation({ body });
