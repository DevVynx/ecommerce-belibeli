import { ZapIcon } from "lucide-react";
import { FlashSaleTimer } from "./FlashSaleTimer";

export const SectionHeader = () => {
  return (
    <header className="flex flex-wrap items-center gap-3">
      <ZapIcon className="h-8 w-8 rounded-full bg-black p-1.5 text-white fill-current stroke-0" />
      <h1 className="mr-2 text-lg font-bold">Ofertas Relâmpago</h1>

      {/* Passe uma data em formato UTC, ex:2026-10-27T10:00:00Z */}
      <FlashSaleTimer endDate="2030-10-08T10:00:00Z" />
    </header>
  );
};
