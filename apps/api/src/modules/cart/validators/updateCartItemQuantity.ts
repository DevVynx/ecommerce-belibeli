import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  cartItemId: z.uuid("Valor inválido."),
  quantity: z.coerce
    .number("Valor inválido.")
    .min(1, "A quantidade mínima é 1."),
});

export const updateCartItemQuantity = validation({ body });
