import { RotateCcw, Shield } from "lucide-react";

export const ProductTrustBar = () => {
  return (
    <div className="mt-6 flex items-center justify-center gap-6 border-t border-border pt-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <RotateCcw size={16} />
        <span className="font-mono text-[10px] uppercase tracking-widest">Devolução Grátis</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Shield size={16} />
        <span className="font-mono text-[10px] uppercase tracking-widest">Pagamento Seguro</span>
      </div>
    </div>
  );
};
