"use client";
import { FileQuestionMark, LogIn, Truck, User, UserPlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/components/shadcn-ui/button";
import { Separator } from "@/shared/components/shadcn-ui/separator";

export const UserMenuContentUnauthenticated = () => {
  return (
    <div className="flex w-56 flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
          <User className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Olá, Visitante</span>
          <span className="text-muted-foreground text-xs">Entre ou cadastre-se</span>
        </div>
      </div>

      <Separator />

      {/* Botões de ação */}
      <div className="flex flex-col gap-2 p-4">
        <Button asChild className="w-full gap-2">
          <Link href="/login">
            <LogIn className="size-4" />
            Entrar
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full gap-2">
          <Link href="/register">
            <UserPlus className="size-4" />
            Criar conta
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Links úteis */}
      <div className="flex flex-col py-2">
        <Link
          href="/orders"
          className="hover:bg-muted flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-colors"
        >
          <Truck className="size-5" />
          Rastrear pedido
        </Link>

        <Link
          href="/support"
          className="hover:bg-muted flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-colors"
        >
          <FileQuestionMark className="size-5" />
          Ajuda e suporte
        </Link>
      </div>
    </div>
  );
};
