import * as z from "zod";

export const cepSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "Insira um CEP válido")
    .refine((cep) => !/^(\d)\1{4}-\1{3}$/.test(cep), "Insira um CEP válido"),
});
