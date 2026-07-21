import { useFormContext } from "react-hook-form";

import { Card, CardContent } from "@/shared/components/shadcn-ui/card";
import type { CreatePromotionFormData } from "@/shared/schemas/createPromotion";
import { formatPrice } from "@/shared/utils/store/price";

function formatSummaryDate(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR");
  const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${date} às ${time}`;
}

const TARGET_TYPE_LABELS: Record<string, string> = {
  category: "Categoria",
  product: "Produto",
  variant: "Variante",
};

export function PromotionSummaryTicket({ mode = "create" }: { mode?: "create" | "edit" }) {
  const { watch } = useFormContext<CreatePromotionFormData>();
  const values = watch();

  const discountLabel =
    values.type === "PERCENTAGE"
      ? `${values.discountValue ?? 0}% de desconto`
      : `${formatPrice(values.discountValue ?? 0)} de desconto`;

  const targetTypeLabel = TARGET_TYPE_LABELS[values.targetType] ?? values.targetType;

  const dateRangeStr =
    values.startsAt && values.endsAt
      ? `Válido de ${formatSummaryDate(values.startsAt)} até ${formatSummaryDate(values.endsAt)}.`
      : "";

  return (
    <Card className="border-dashed">
      <CardContent className="space-y-2 p-4 text-sm">
        <p className="font-semibold">Resumo da Promoção</p>

        <p>
          Nome: <span className="font-medium">{values.name || "---"}</span>
        </p>

        <p>
          Desconto: <strong>{discountLabel}</strong>
        </p>

        <p>
          Alvo:{" "}
          <span className="font-medium">
            {targetTypeLabel}
            {values.targetName ? ` · ${values.targetName}` : ""}
          </span>
        </p>

        {dateRangeStr && <p>{dateRangeStr}</p>}

        {!values.isActive && (
          <p className="text-muted-foreground text-xs">
            {mode === "edit" ? "A promoção está inativa." : "A promoção será criada como inativa."}
          </p>
        )}

        <p className="text-muted-foreground mt-2 border-t pt-2 text-xs italic">
          {mode === "edit"
            ? "Revise os dados antes de salvar."
            : "Verifique com atenção os dados, pois após a criação não será possível alterar a maioria das informações da promoção."}
        </p>
      </CardContent>
    </Card>
  );
}
