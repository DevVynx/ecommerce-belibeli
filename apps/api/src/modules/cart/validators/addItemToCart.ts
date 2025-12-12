import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const OptionSchema = z.object({
  optionId: z.uuid("Valor inválido"),
  optionValueId: z.uuid("Valor inválido"),
});

const body = z.object({
  productId: z.uuid("Valor inválido."),
  productOptions: z.preprocess((val) => {
    if (val == null) return [];
    return val;
  }, z.array(OptionSchema).default([])),
  quantity: z.coerce
    .number("Valor inválido.")
    .min(1, "A quantidade mínima é 1."),
});

export const addItemToCart = validation({ body });
