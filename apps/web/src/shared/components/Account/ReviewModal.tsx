import type { OrderItemDto } from "@repo/types/contracts";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";

import { createReview } from "@/shared/actions/reviews/createReview";
import { deleteReview } from "@/shared/actions/reviews/deleteReview";
import { updateReview } from "@/shared/actions/reviews/updateReview";
import { Button } from "@/shared/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn-ui/dialog";
import { Rating, RatingItem } from "@/shared/components/shadcn-ui/rating";
import { Textarea } from "@/shared/components/shadcn-ui/textarea";
import { showNotification } from "@/shared/components/showNotification";
import type { ApiErrorResponse } from "@/shared/types/api/error";
import { authenticatedAction } from "@/shared/utils/api/authenticatedAction";

function getErrorMessage(error: ApiErrorResponse): string {
  if (typeof error.message === "string") return error.message;
  return "Erro inesperado. Tente novamente.";
}

type ReviewModalMode = "create" | "view" | "edit" | "delete-confirm";

type ReviewModalProps = {
  item: OrderItemDto;
  open: boolean;
  onClose: () => void;
  onReviewChanged?: () => void;
};

export const ReviewModal = ({ item, open, onClose, onReviewChanged }: ReviewModalProps) => {
  const [mode, setMode] = useState<ReviewModalMode>(item.userReview ? "view" : "create");
  const [rating, setRating] = useState(item.userReview?.rating ?? 5);
  const [comment, setComment] = useState(item.userReview?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);

  const resetToView = useCallback(() => {
    if (item.userReview) {
      setMode("view");
      setRating(item.userReview.rating);
      setComment(item.userReview.comment);
    } else {
      onClose();
    }
  }, [item.userReview, onClose]);

  const handleSubmitReview = useCallback(async () => {
    if (rating < 1) return;
    setSubmitting(true);

    const { error } = await authenticatedAction(createReview, item.productId, { rating, comment });

    setSubmitting(false);

    if (error) {
      showNotification({ type: "error", title: "Erro", message: getErrorMessage(error) });
      return;
    }

    showNotification({
      type: "success",
      title: "Avaliação enviada!",
      message: "Obrigado por avaliar o produto.",
    });
    onReviewChanged?.();
    onClose();
  }, [rating, comment, item.productId, onReviewChanged, onClose]);

  const handleSaveEdit = useCallback(async () => {
    if (rating < 1) return;
    setSubmitting(true);

    const { error } = await authenticatedAction(updateReview, item.productId, { rating, comment });

    setSubmitting(false);

    if (error) {
      showNotification({ type: "error", title: "Erro", message: getErrorMessage(error) });
      return;
    }

    showNotification({ type: "success", title: "Avaliação atualizada!" });
    onReviewChanged?.();
    onClose();
  }, [rating, comment, item.productId, onReviewChanged, onClose]);

  const handleDelete = useCallback(async () => {
    setSubmitting(true);

    const { error } = await authenticatedAction(deleteReview, item.productId);

    setSubmitting(false);

    if (error) {
      showNotification({ type: "error", title: "Erro", message: getErrorMessage(error) });
      return;
    }

    showNotification({ type: "success", title: "Avaliação excluída!" });
    onReviewChanged?.();
    onClose();
  }, [item.productId, onReviewChanged, onClose]);

  const dialogTitle =
    mode === "create"
      ? "Avaliar Produto"
      : mode === "view"
        ? "Sua Avaliação"
        : mode === "edit"
          ? "Editar Avaliação"
          : "Excluir Avaliação";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="line-clamp-1">{item.productName}</DialogDescription>
        </DialogHeader>

        {mode === "delete-confirm" ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Tem certeza que deseja excluir sua avaliação? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setMode("view")}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Sim, excluir
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="ml-2 flex items-center justify-start">
              <Rating
                value={rating}
                onValueChange={setRating}
                max={5}
                step={1}
                readOnly={mode === "view"}
                className="gap-4 text-yellow-400"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <RatingItem key={i}>
                    <Star className="size-8" />
                  </RatingItem>
                ))}
              </Rating>
            </div>

            {mode === "view" ? (
              <>
                <p className="text-muted-foreground min-h-15 text-sm leading-relaxed">
                  {item.userReview?.comment ?? "Sem comentário."}
                </p>
                {item.userReview && (
                  <p className="text-muted-foreground text-right text-xs">
                    {new Date(item.userReview.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                )}

                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline" onClick={() => setMode("edit")}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => setMode("delete-confirm")}>
                    Excluir
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Textarea
                  placeholder={
                    mode === "edit"
                      ? "Edite sua avaliação..."
                      : "Conte sua experiência com o produto..."
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  disabled={submitting}
                />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetToView} disabled={submitting}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={mode === "edit" ? handleSaveEdit : handleSubmitReview}
                    disabled={rating < 1 || submitting}
                  >
                    {submitting ? "Enviando..." : mode === "edit" ? "Salvar" : "Enviar Avaliação"}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
