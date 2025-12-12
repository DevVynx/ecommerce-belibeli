import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  cartItemId: z.uuid("Valor inválido."),
});

export const removeItemFromCart = validation({ body });
