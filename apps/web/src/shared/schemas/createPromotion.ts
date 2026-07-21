import { z } from "zod";

export const createPromotionSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    discountValue: z.number().positive("Valor deve ser positivo"),
    isActive: z.boolean().default(true),
    startsAt: z.string().min(1, "Data de início é obrigatória"),
    endsAt: z.string().min(1, "Data de fim é obrigatória"),
    targetType: z.enum(["category", "product", "variant"]),
    targetId: z.string().uuid("Selecione um alvo"),
    targetName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startsAt && data.endsAt && data.startsAt >= data.endsAt) {
      ctx.addIssue({
        code: "custom",
        message: "Data de fim deve ser posterior à data de início",
        path: ["endsAt"],
      });
    }
  });

export type CreatePromotionFormData = z.input<typeof createPromotionSchema>;
