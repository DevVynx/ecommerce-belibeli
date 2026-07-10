import { z } from "zod";

export const createCouponSchema = z
  .object({
    code: z
      .string()
      .min(1, "Código é obrigatório")
      .max(15, "Máximo 15 caracteres"),
    type: z.enum(["PERCENTAGE", "FIXED", "FREE_SHIPPING"]),
    description: z.string().optional(),
    value: z.number().min(0, "Valor deve ser positivo").optional(),
    maxDiscount: z
      .number()
      .positive("Desconto máximo deve ser positivo")
      .nullable()
      .optional(),
    minOrderValue: z
      .number()
      .positive("Valor mínimo deve ser positivo")
      .default(1),
    usageLimit: z.number().int("Deve ser inteiro").positive("Deve ser positivo"),
    usageLimitPerUser: z
      .number()
      .int("Deve ser inteiro")
      .positive("Deve ser positivo")
      .default(1),
    startsAt: z.string().min(1, "Data de início é obrigatória"),
    endsAt: z.string().min(1, "Data de fim é obrigatória"),
    isActive: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if ((data.type === "PERCENTAGE" || data.type === "FIXED") && (!data.value || data.value <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valor do desconto é obrigatório para este tipo",
        path: ["value"],
      });
    }

    if (data.type === "PERCENTAGE" && data.maxDiscount !== null && data.maxDiscount !== undefined && data.maxDiscount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Desconto máximo deve ser positivo",
        path: ["maxDiscount"],
      });
    }

    if (data.startsAt && data.endsAt && data.startsAt >= data.endsAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de fim deve ser posterior à data de início",
        path: ["endsAt"],
      });
    }
  });

export type CreateCouponFormData = z.input<typeof createCouponSchema>;
