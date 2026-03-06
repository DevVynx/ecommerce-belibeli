import type { Metadata } from "next";

import { LeftRegisterSide } from "@/shared/components/auth/register/LeftRegisterSide";
import { RightRegisterSide } from "@/shared/components/auth/register/RightRegisterSide";

export const metadata: Metadata = {
  title: "Criar Conta | BeliBeli Store",
  description:
    "Cadastre-se na BeliBeli Store e descubra uma nova experiência de compras online. Crie sua conta e aproveite promoções exclusivas e vantagens especiais.",
};

export default function RegisterPage() {
  return (
    <div className="auth-wrapper bg-background flex min-h-screen min-w-screen justify-center">
      <div className="flex min-h-full min-w-full">
        {/* Lado Esquerdo: Formulário (Invertido em relação ao Login) */}
        <LeftRegisterSide />
        {/* Lado Direito: Ilustração (Invertido em relação ao Login) */}
        <RightRegisterSide />
      </div>
    </div>
  );
}
