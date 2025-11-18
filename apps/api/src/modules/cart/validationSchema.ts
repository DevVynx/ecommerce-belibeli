import z from "zod";

const OptionSchema = z.object({
  optionId: z.number("Valor inválido"),
  optionValueId: z.number("Valor inválido"),
});

const createCartItem = z.object({
  userId: z.coerce.number("Valor inválido.").positive("O número deve ser maior que zero."),
  productId: z.coerce.number("Valor inválido.").positive("O número deve ser maior que zero."),
  productOptions: z.array(OptionSchema, "Valor inválido").default([]),
  quantity: z.coerce.number("Valor inválido."),
});

const update = z.object({
  cartItemId: z.coerce.number("Valor inválido.").positive("O número deve ser maior que zero."),
  quantity: z.coerce.number("Valor inválido."),
});

export const cartItemSchema = { createCartItem, update };
