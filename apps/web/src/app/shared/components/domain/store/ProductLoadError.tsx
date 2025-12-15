"use client";
import { useEffect } from "react";

import { WifiOffIcon } from "@/app/shared/assets/animatedIcons/wifioff";
import { LoadError } from "@/app/shared/components/LoadError";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";

type ProductLoadErrorProps = {
  onRetryAction: () => void;
};

export const ProductLoadError = ({ onRetryAction }: ProductLoadErrorProps) => {
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
      title="Não foi possivel carregar os produtos"
      description="Parece que estamos com problemas para buscar os produtos. Por favor, verifique sua conexão com a internet ou aguarde alguns instantes."
      onRetryAction={onRetryAction}
      buttonText="Tentar novamente"
    />
  );
};
