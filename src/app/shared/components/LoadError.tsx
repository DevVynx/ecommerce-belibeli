"use client";
import { Button } from "@/app/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/shared/components/ui/empty";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import { WifiOffIcon } from "lucide-react";
import { useEffect } from "react";

type LoadErrorProps = {
  onRetry: () => void;
};

export const LoadError = ({ onRetry }: LoadErrorProps) => {
  const { handleMouseEnter, handleMouseLeave, iconRef } = useAnimatedIcon();

  useEffect(() => {
    const startTimer = setTimeout(() => {
      iconRef.current?.startAnimation();
      setTimeout(() => {
        iconRef.current?.stopAnimation();
      }, 1000);
    }, 100);
    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  return (
    <Empty>
      <EmptyHeader className="max-w-lg">
        <EmptyMedia
          variant="default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="rounded-full bg-red-100 p-4"
        >
          <WifiOffIcon className="size-10 text-red-500" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl font-bold">
          Não foi possivel carregar os produtos
        </EmptyTitle>
        <EmptyDescription>
          Parece que estamos com problemas para buscar os produtos. Por favor, verifique sua conexão
          com a internet ou aguarde alguns instantes.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="default"
          size="lg"
          className="cursor-pointer bg-blue-500 px-30 font-bold hover:bg-blue-500/80 active:bg-blue-500/50"
          onClick={onRetry}
        >
          Tentar novamente
        </Button>
      </EmptyContent>
    </Empty>
  );
};
