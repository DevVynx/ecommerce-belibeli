import { UploadIcon } from "lucide-react";
import type { DragEvent, InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/lib/utils";

type ImageUploadDropZoneProps = {
  isDragging: boolean;
  onDragEnter: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onClick: () => void;
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>
  ) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};

export function ImageUploadDropZone({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  getInputProps,
}: ImageUploadDropZoneProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border border-dashed p-8 text-center transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      <input {...getInputProps()} className="sr-only" />

      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}
        >
          <UploadIcon
            className={cn("h-5", isDragging ? "text-primary" : "text-muted-foreground")}
          />
        </div>
        <p className="text-muted-foreground text-sm">Arraste imagens ou clique para selecionar</p>
      </div>
    </div>
  );
}
