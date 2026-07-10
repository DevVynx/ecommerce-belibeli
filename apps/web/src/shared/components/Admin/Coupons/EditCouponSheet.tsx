import type { AdminCouponDto } from "@repo/types/contracts";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/shadcn-ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/shadcn-ui/sheet";
import { useScreenSize } from "@/shared/hooks/ui/useScreenSize";

import { EditCouponForm } from "./EditCouponForm";

type EditCouponSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: AdminCouponDto;
  onSuccess?: () => void;
};

export function EditCouponSheet({ open, onOpenChange, coupon, onSuccess }: EditCouponSheetProps) {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Editar Cupom</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <EditCouponForm coupon={coupon} onSuccess={onSuccess} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Editar Cupom</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <EditCouponForm coupon={coupon} onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
