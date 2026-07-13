import { z } from "zod";

export const createCouponSchema = z
  .object({
    code: z.string().min(1, "Código é obrigatório").max(15, "Máximo 15 caracteres"),
    type: z.enum(["PERCENTAGE", "FIXED", "FREE_SHIPPING"]),
    description: z.string().optional(),
    value: z.number().min(0, "Valor deve ser positivo").optional(),
    maxDiscount: z.number().nullable().optional(),
    minOrderValue: z.number().positive("Valor mínimo deve ser positivo").default(1),
    usageLimit: z
      .number("Usos totais é obrigatório")
      .int("Deve ser inteiro")
      .positive("Deve ser positivo"),
    usageLimitPerUser: z.number().int("Deve ser inteiro").positive("Deve ser positivo").default(1),
    startsAt: z.string().min(1, "Data de início é obrigatória"),
    endsAt: z.string().min(1, "Data de fim é obrigatória"),
    isActive: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if ((data.type === "PERCENTAGE" || data.type === "FIXED") && (!data.value || data.value <= 0)) {
      ctx.addIssue({
        code: "custom",
        message: "Valor do desconto é obrigatório para este tipo",
        path: ["value"],
      });
    }

    if (data.startsAt && data.endsAt && data.startsAt >= data.endsAt) {
      ctx.addIssue({
        code: "custom",
        message: "Data de fim deve ser posterior à data de início",
        path: ["endsAt"],
      });
    }
  });

export type CreateCouponFormData = z.input<typeof createCouponSchema>;
