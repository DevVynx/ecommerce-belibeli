import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/shadcn-ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/shadcn-ui/sheet";
import { useScreenSize } from "@/shared/hooks/ui/useScreenSize";

import { CreateCouponForm } from "./CreateCouponForm";

type CreateCouponSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function CreateCouponSheet({ open, onOpenChange, onSuccess }: CreateCouponSheetProps) {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Criar Cupom</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <CreateCouponForm onSuccess={onSuccess} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Criar Cupom</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <CreateCouponForm onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
