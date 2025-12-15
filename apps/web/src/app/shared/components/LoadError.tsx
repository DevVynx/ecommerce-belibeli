"use client";
import type { HTMLAttributes, ReactNode } from "react";

import { Button } from "@/app/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/shared/components/ui/empty";

// Tipamos os props do wrapper do ícone (que é um <div>)
type EmptyMediaProps = HTMLAttributes<HTMLDivElement>;

type LoadErrorProps = {
  /** Ação a ser executada ao clicar no botão */
  onRetryAction: () => void;
  /** O elemento do ícone a ser renderizado */
  icon: ReactNode;
  /** O título principal */
  title: ReactNode;
  /** O texto de descrição */
  description: ReactNode;
  /** Texto do botão (opcional, padrão 'Tentar novamente') */
  buttonText?: string;
  /** Classe CSS para o wrapper do ícone (opcional) */
  iconWrapperClassName?: string;
  /** Props a serem passadas para o wrapper do ícone (ex: onMouseEnter, onMouseLeave) */
  iconWrapperProps?: EmptyMediaProps;
};

export const LoadError = ({
  onRetryAction,
  icon,
  title,
  description,
  buttonText = "Tentar novamente",
  iconWrapperClassName,
  iconWrapperProps,
}: LoadErrorProps) => {
  return (
    <Empty>
      <EmptyHeader className="max-w-lg">
        <EmptyMedia
          variant="default"
          className={iconWrapperClassName}
          // Passamos os handlers (onMouseEnter/Leave) e outros props aqui
          {...iconWrapperProps}
        >
          {/* Renderizamos o ícone recebido via props */}
          {icon}
        </EmptyMedia>
        <EmptyTitle className="text-2xl font-bold">
          {/* Renderizamos o título recebido via props */}
          {title}
        </EmptyTitle>
        <EmptyDescription>
          {/* Renderizamos a descrição recebida via props */}
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="default"
          size="lg"
          className="cursor-pointer bg-blue-500 px-30 font-bold hover:bg-blue-500/80 active:bg-blue-500/50"
          onClick={onRetryAction}
        >
          {buttonText}
        </Button>
      </EmptyContent>
    </Empty>
  );
};
