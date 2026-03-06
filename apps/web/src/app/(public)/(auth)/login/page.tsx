import type { Metadata } from "next";

import { LeftLoginSide } from "@/shared/components/auth/login/LeftLoginSide";
import { RightLoginSide } from "@/shared/components/auth/login/RightLoginSide";

export const metadata: Metadata = {
  title: "Entrar | BeliBeli Store",
  description:
    "Acesse sua conta na BeliBeli Store para acompanhar pedidos, gerenciar informações e aproveitar as melhores ofertas com praticidade.",
};

export default function LoginPage() {
  return (
    <div className="auth-wrapper bg-background flex min-h-screen min-w-screen justify-center">
      <div className="flex min-h-full min-w-full">
        <LeftLoginSide />
        <RightLoginSide />
      </div>
    </div>
  );
}
