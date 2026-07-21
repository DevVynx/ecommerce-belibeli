import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/shadcn-ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/shadcn-ui/sheet";
import { useScreenSize } from "@/shared/hooks/ui/useScreenSize";

import { CreatePromotionForm } from "./CreatePromotionForm";

type CreatePromotionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function CreatePromotionSheet({ open, onOpenChange, onSuccess }: CreatePromotionSheetProps) {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Criar Promoção</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <CreatePromotionForm onSuccess={onSuccess} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Criar Promoção</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <CreatePromotionForm onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
