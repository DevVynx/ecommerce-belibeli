import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const query = z.object({
  categoryId: z.uuid("Valor Inválido").optional(),
  offset: z.coerce.number("Valor Inválido").nonnegative().default(0),
  limit: z.coerce.number("Valor Inválido").positive().max(100).default(16),
  onSale: z
    .enum(["true", "false"], { message: "Valor Inválido" })
    .transform((v) => v === "true")
    .optional(),
});

export const getAll = validation({ query });
