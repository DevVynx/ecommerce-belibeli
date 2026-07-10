import z from "zod";

import { validation } from "@/shared/middlewares/validation";
import { dateString } from "@/shared/utils/validators";

const params = z.object({
  id: z.string().uuid("ID inválido."),
});

const body = z.object({
  code: z
    .string()
    .min(1, "Informe um código.")
    .max(15, "Código muito longo.")
    .transform((s) => s.toUpperCase())
    .optional(),
  type: z
    .enum(["PERCENTAGE", "FIXED", "FREE_SHIPPING"], { message: "Tipo de cupom inválido." })
    .optional(),
  description: z.string().optional(),
  value: z.number().int().min(0, "Valor não pode ser negativo.").optional(),
  maxDiscount: z.number().positive("Valor máximo deve ser positivo.").optional().nullable(),
  minOrderValue: z.number().positive("Valor mínimo deve ser positivo.").optional(),
  startsAt: dateString().optional(),
  endsAt: dateString().optional(),
  usageLimit: z.number().int().positive("Limite deve ser positivo.").optional(),
  usageLimitPerUser: z.number().int().positive("Limite por usuário deve ser positivo.").optional(),
  isActive: z.boolean().optional(),
});

export const updateCoupon = validation({ params, body });
