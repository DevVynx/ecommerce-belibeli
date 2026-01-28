import { useMemo } from "react";

import { DesktopCartSummary } from "@/app/(view)/(store)/cart/components/CartSummary/Desktop/DesktopCartSummary";
import { MobileCartSummary } from "@/app/(view)/(store)/cart/components/CartSummary/Mobile/MobileCartSummary";
import { useHeaderHeight } from "@/app/shared/contexts/HeaderHeightContext";
import { useAnimatedIcons } from "@/app/shared/hooks/ui/useAnimatedIcons";

type CartSummaryProps = {
  summary: {
    count: number;
    total: number;
    subtotal: number;
    discount: number;
  };
  isCartLoading: boolean;
};

export const CartSummary = ({ summary, isCartLoading }: CartSummaryProps) => {
  const { headerHeight, headerVisible } = useHeaderHeight();
  const { getIconRef, getHandlers } = useAnimatedIcons({ autoStartDelay: 200 });

  // Quando header está visível, coloca o resumo abaixo dele (altura + gap)
  // Quando header está oculto, coloca no topo com apenas um gap pequeno
  const stickyTopValue = useMemo(() => {
    return headerVisible ? headerHeight + 12 : 12;
  }, [headerHeight, headerVisible]);

  return (
    <>
      <MobileCartSummary
        summary={summary}
        isCartLoading={isCartLoading}
        getHandlers={getHandlers}
        getIconRef={getIconRef}
      />
      <DesktopCartSummary
        summary={summary}
        isCartLoading={isCartLoading}
        stickyTopValue={stickyTopValue}
        getHandlers={getHandlers}
        getIconRef={getIconRef}
      />
    </>
  );
};
