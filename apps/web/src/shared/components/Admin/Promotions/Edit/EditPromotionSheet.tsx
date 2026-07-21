import type { AdminPromotionDto } from "@repo/types/contracts";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/shadcn-ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/shadcn-ui/sheet";
import { useScreenSize } from "@/shared/hooks/ui/useScreenSize";

import { EditPromotionForm } from "./EditPromotionForm";

type EditPromotionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: AdminPromotionDto;
  onSuccess?: () => void;
};

export function EditPromotionSheet({ open, onOpenChange, promotion, onSuccess }: EditPromotionSheetProps) {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Editar Promoção</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <EditPromotionForm promotion={promotion} onSuccess={onSuccess} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Editar Promoção</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <EditPromotionForm promotion={promotion} onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
