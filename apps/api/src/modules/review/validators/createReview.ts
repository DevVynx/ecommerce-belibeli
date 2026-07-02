import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  rating: z
    .number()
    .int()
    .min(1, "A avaliação deve ser entre 1 e 5")
    .max(5, "A avaliação deve ser entre 1 e 5"),
  comment: z
    .string()
    .min(1, "Comentário é obrigatório")
    .max(500, "Comentário deve ter no máximo 500 caracteres"),
});

const params = z.object({
  productId: z.uuid("Valor Inválido"),
});

export const createReview = validation({ body, params });
