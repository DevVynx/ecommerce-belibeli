"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createProduct } from "@/shared/actions/products/createProduct";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Separator } from "@/shared/components/shadcn-ui/separator";
import { showNotification } from "@/shared/components/showNotification";
import { type CreateProductFormData, createProductSchema } from "@/shared/schemas/createProduct";

import { BasicInfoSection } from "./BasicInfoSection";
import { ImageGroupSection } from "./ImageGroupSection";
import type { StoredImage } from "./ImageUploadBlock";
import { OptionsBuilder } from "./OptionsBuilder";
import { VariantMatrix } from "./VariantMatrix";

type CreateProductFormProps = {
  categories: { id: string; name: string }[];
  onSuccess?: () => void;
};

export function CreateProductForm({ categories, onSuccess }: CreateProductFormProps) {
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      options: [],
      variants: [],
    },
  });

  const options = form.watch("options");

  const [imageOptionIndex, setImageOptionIndex] = useState<number | null>(null);
  const [imageMap, setImageMap] = useState<Record<string, StoredImage[]>>({});

  const handleImagesChange = useCallback((value: string, images: StoredImage[]) => {
    setImageMap((prev) => ({
      ...prev,
      [value]: [...(prev[value] ?? []), ...images],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await form.trigger();
    if (!valid) return;

    const raw = form.getValues();
    const imageOptionName = imageOptionIndex !== null ? options[imageOptionIndex]?.name : undefined;

    // Validate that all image option values have at least one image
    if (imageOptionName) {
      const missingImages = options[imageOptionIndex!]!.values.filter(
        (v) => !imageMap[v] || imageMap[v]!.length === 0
      );
      if (missingImages.length > 0) {
        showNotification({
          type: "error",
          title: "Imagens necessárias",
          message: `As variantes de "${missingImages.join(", ")}" precisam de pelo menos uma imagem.`,
        });
        return;
      }
    }

    const imageKey = imageOptionName ?? "";
    const payload = {
      name: raw.name,
      description: raw.description,
      categoryId: raw.categoryId,
      options: raw.options,
      variants: raw.variants.map((v) => ({
        sku: v.sku,
        price: Number(v.price),
        stock: Number(v.stock),
        weight: Number(v.weight),
        isActive: v.isActive ?? true,
        attributes: v.attributes,
        images:
          imageKey && v.attributes[imageKey] && imageMap[v.attributes[imageKey]!]
            ? imageMap[v.attributes[imageKey]!]!.map((img) => ({
                url: img.url,
                publicId: img.publicId,
              }))
            : [],
      })),
    };

    // Check if any variant has no images
    const noImageVariants = payload.variants.filter((v) => v.images.length === 0);
    if (noImageVariants.length > 0) {
      showNotification({
        type: "error",
        title: "Imagens necessárias",
        message:
          "Todas as variantes precisam de pelo menos uma imagem. Selecione uma opção de imagem e faça upload.",
      });
      return;
    }

    const result = await createProduct(payload);

    if (result.error) {
      showNotification({
        type: "error",
        title: "Erro ao criar produto",
        message: result.error.message,
      });
      return;
    }

    showNotification({
      type: "success",
      title: "Produto criado",
      message: `O produto "${raw.name}" foi criado com ${payload.variants.length} variante${payload.variants.length !== 1 ? "s" : ""}.`,
    });
    onSuccess?.();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <BasicInfoSection categories={categories} />

        <Separator />

        <OptionsBuilder />

        <Separator />

        <ImageGroupSection
          imageOptionIndex={imageOptionIndex}
          onImageOptionIndexChange={setImageOptionIndex}
          onImagesChange={handleImagesChange}
        />

        <Separator />

        <VariantMatrix />

        <Button
          type="submit"
          className="w-full py-4"
          disabled={form.watch("variants").length === 0}
        >
          Criar Produto
        </Button>
      </form>
    </FormProvider>
  );
}
