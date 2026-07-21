import { zodResolver } from "@hookform/resolvers/zod";
import type { AdminPromotionDto } from "@repo/types/contracts";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { updatePromotion } from "@/shared/actions/promotions/updatePromotion";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Field, FieldContent, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import { Switch } from "@/shared/components/shadcn-ui/switch";
import { showNotification } from "@/shared/components/showNotification";
import {
  type CreatePromotionFormData,
  createPromotionSchema,
} from "@/shared/schemas/createPromotion";
import {
  getCurrentSlot,
  getEndsAtConstraints,
  getTodayMidnight,
} from "@/shared/utils/date/dateTimeISO";

import { DateTimePicker } from "../../Coupons/DateTimePicker";
import { PromotionDiscountFields } from "../Create/PromotionDiscountFields";
import { PromotionSummaryTicket } from "../Create/PromotionSummaryTicket";
import { TargetSection } from "../Create/TargetSection";

type EditPromotionFormProps = {
  promotion: AdminPromotionDto;
  onSuccess?: () => void;
};

export function EditPromotionForm({ promotion, onSuccess }: EditPromotionFormProps) {
  const today = useMemo(() => getTodayMidnight(), []);
  const currentSlot = getCurrentSlot();

  const form = useForm<CreatePromotionFormData>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      name: promotion.name,
      type: promotion.type,
      discountValue: promotion.discountValue,
      isActive: promotion.isActive,
      startsAt: promotion.startsAt,
      endsAt: promotion.endsAt,
      targetType: promotion.targetType,
      targetId: promotion.targetId,
      targetName: promotion.targetName,
    },
  });

  const { errors } = form.formState;

  const startsAt = form.watch("startsAt");
  const {
    disabledBeforeDate: endsAtDisabledBeforeDate,
    disabledBeforeTime: endsAtDisabledBeforeTime,
  } = getEndsAtConstraints(startsAt);

  const onSubmit = async (raw: CreatePromotionFormData) => {
    const result = await updatePromotion(promotion.id, {
      name: raw.name,
      type: raw.type,
      discountValue: raw.discountValue,
      isActive: raw.isActive,
      startsAt: raw.startsAt,
      endsAt: raw.endsAt,
      targetType: raw.targetType,
      targetId: raw.targetId,
    });

    if (result.error) {
      showNotification({
        type: "error",
        title: "Erro ao editar promoção",
        message: result.error.message,
      });
      return;
    }

    showNotification({
      type: "success",
      title: "Promoção editada",
      message: `Promoção ${raw.name} salva com sucesso.`,
    });
    onSuccess?.();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Field>
          <FieldLabel>Nome</FieldLabel>
          <FieldContent>
            <Input placeholder="Ex: Promoção de Verão" {...form.register("name")} />
            {errors.name && <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>}
          </FieldContent>
        </Field>

        <PromotionDiscountFields />

        <TargetSection defaultTarget={{ id: promotion.targetId, name: promotion.targetName }} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Início</FieldLabel>
            <FieldContent>
              <DateTimePicker
                value={startsAt}
                onChange={(v) => form.setValue("startsAt", v ?? "")}
                minDate={today}
                disabledBeforeTime={currentSlot}
                disabledBeforeDate={new Date()}
                defaultTime={currentSlot}
                placeholder="Data de início"
              />
              {errors.startsAt && (
                <p className="text-destructive mt-1 text-xs">{errors.startsAt.message}</p>
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Fim</FieldLabel>
            <FieldContent>
              <DateTimePicker
                value={form.watch("endsAt")}
                onChange={(v) => form.setValue("endsAt", v ?? "")}
                minDate={endsAtDisabledBeforeDate ? new Date(endsAtDisabledBeforeDate) : today}
                disabledBeforeTime={endsAtDisabledBeforeTime}
                disabledBeforeDate={endsAtDisabledBeforeDate}
                defaultTime="23:30"
                placeholder="Data de fim"
                hideAgora
              />
              {errors.endsAt && (
                <p className="text-destructive mt-1 text-xs">{errors.endsAt.message}</p>
              )}
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel>Ativo</FieldLabel>
          <FieldContent>
            <div className="flex h-9 items-center">
              <Switch
                checked={form.watch("isActive")}
                onCheckedChange={(v) => form.setValue("isActive", v)}
              />
            </div>
          </FieldContent>
        </Field>

        <PromotionSummaryTicket mode="edit" />

        <Button type="submit" className="w-full py-4">
          Salvar
        </Button>
      </form>
    </FormProvider>
  );
}
