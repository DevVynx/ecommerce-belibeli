"use client";

import { useFormContext } from "react-hook-form";

import { Field, FieldContent, FieldLabel } from "@/shared/components/shadcn-ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import type { CreateProductFormData } from "@/shared/schemas/createProduct";

import { ImageUploadBlock, type StoredImage } from "./ImageUploadBlock";

type ImageGroupSectionProps = {
  imageOptionIndex: number | null;
  onImageOptionIndexChange: (index: number | null) => void;
  onImagesChange: (value: string, images: StoredImage[]) => void;
};

export function ImageGroupSection({
  imageOptionIndex,
  onImageOptionIndexChange,
  onImagesChange,
}: ImageGroupSectionProps) {
  const { watch } = useFormContext<CreateProductFormData>();
  const options = watch("options");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Imagens</h2>

      <Field>
        <FieldLabel>Qual opção define as imagens?</FieldLabel>
        <FieldContent>
          <Select
            value={imageOptionIndex !== null ? String(imageOptionIndex) : ""}
            onValueChange={(v) => onImageOptionIndexChange(v ? Number(v) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {opt.name || `Opção ${idx + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      {imageOptionIndex !== null && options[imageOptionIndex] && (
        <div className="space-y-6">
          {options[imageOptionIndex]!.values.map((value) => (
            <ImageUploadBlock
              key={value}
              label={value}
              onImagesChange={(images) => onImagesChange(value, images)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
