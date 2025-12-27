"use client";
import { useEffect } from "react";

import { WifiOffIcon } from "@/app/shared/assets/animatedIcons/wifioff";
import { LoadAlert } from "@/app/shared/components/LoadAlert";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";

type ProductLoadErrorProps = {
  refetchAction: () => void;
};

export const ProductLoadError = ({ refetchAction }: ProductLoadErrorProps) => {
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
    <LoadAlert
      iconWrapperProps={{
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }}
      icon={<WifiOffIcon ref={iconRef} size={50} />}
      title="Não foi possivel carregar os produtos"
      description="Parece que estamos com problemas para buscar os produtos. Por favor, verifique sua conexão com a internet ou aguarde alguns instantes."
      actions={[
        {
          label: "Tentar novamente",
          onClick: refetchAction,
        },
      ]}
    />
  );
};
