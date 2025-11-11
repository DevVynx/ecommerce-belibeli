"use client";
import { LoadError } from "@/app/shared/components/LoadError";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import { WifiOffIcon } from "@/assets/animatedIcons/wifioff";
import { useEffect } from "react";

type ProductLoadErrorProps = {
  onRetry: () => void;
};

export const CartLoadError = ({ onRetry }: ProductLoadErrorProps) => {
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
  }, [iconRef]);

  return (
    <LoadError
      iconWrapperProps={{
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }}
      iconWrapperClassName="rounded-full bg-red-100 p-4"
      icon={<WifiOffIcon ref={iconRef} size={40} className="text-red-500" />}
      title="Não foi possivel carregar o seu carrinho"
      description="Parece que estamos com problemas para buscar o seu carrinho. Por favor, verifique sua conexão com a internet ou aguarde alguns instantes."
      onRetry={onRetry}
      buttonText="Tentar novamente"
    />
  );
};
