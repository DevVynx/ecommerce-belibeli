import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  destinyCep: z.string("CEP inválido.").regex(/^\d{8}$/, "CEP deve conter exatamente 8 dígitos."),
});

export const quoteShipping = validation({ body });
