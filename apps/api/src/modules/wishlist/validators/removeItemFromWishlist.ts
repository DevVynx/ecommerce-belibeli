import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  wishlistItemId: z.uuid("Valor inválido."),
});

export const removeItemFromWishlist = validation({ body });
