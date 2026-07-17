"use client";

import { CircleAlertIcon, ImageIcon, RefreshCwIcon, UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

import { uploadImage } from "@/shared/actions/products/uploadImage";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/shadcn-ui/alert";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Progress } from "@/shared/components/shadcn-ui/progress";
import {
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/shared/hooks/ui/use-file-upload";
import { cn } from "@/shared/utils/lib/utils";

export type StoredImage = { id: string; url: string; publicId: string };

type ImageUploadBlockProps = {
  label: string;
  onImagesChange: (images: StoredImage[]) => void;
};

type UploadFileItem = FileWithPreview & {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
  result?: StoredImage;
};

export function ImageUploadBlock({ label, onImagesChange }: ImageUploadBlockProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFileItem[]>([]);
  const prevIdsRef = useRef<Set<string>>(new Set());

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      removeFile,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    accept: "image/jpeg,image/png,image/webp,image/gif,image/avif",
    multiple: true,
    onFilesAdded: async (added) => {
      const results: StoredImage[] = [];
      for (const f of added) {
        const item: UploadFileItem = { ...f, progress: 0, status: "uploading" };
        setUploadFiles((prev) => [...prev, item]);
        try {
          const imageCompression = (await import("browser-image-compression")).default;
          const compressed = await imageCompression(f.file as File, {
            maxWidthOrHeight: 1500,
            useWebWorker: true,
          });
          const fd = new FormData();
          fd.append("file", compressed, (f.file as File).name);
          const { data, error } = await uploadImage(fd);
          if (data) {
            const stored: StoredImage = { id: f.id, url: data.url, publicId: data.publicId };
            results.push(stored);
            setUploadFiles((prev) =>
              prev.map((pf) =>
                pf.id === f.id ? { ...pf, progress: 100, status: "completed", result: stored } : pf
              )
            );
          } else {
            setUploadFiles((prev) =>
              prev.map((pf) =>
                pf.id === f.id
                  ? { ...pf, status: "error", error: error?.message ?? "Erro ao fazer upload" }
                  : pf
              )
            );
          }
        } catch {
          setUploadFiles((prev) =>
            prev.map((pf) =>
              pf.id === f.id ? { ...pf, status: "error", error: "Erro ao processar imagem" } : pf
            )
          );
        }
      }
      if (results.length > 0) onImagesChange(results);
    },
    onFilesChange: (files) => {
      const currentIds = new Set(files.map((f) => f.id));
      for (const id of prevIdsRef.current) {
        if (!currentIds.has(id)) {
          setUploadFiles((prev) => prev.filter((pf) => pf.id !== id));
        }
      }
      prevIdsRef.current = currentIds;
    },
  });

  const retryUpload = async (fileId: string) => {
    const item = uploadFiles.find((f) => f.id === fileId);
    if (!item) return;
    setUploadFiles((prev) =>
      prev.map((pf) =>
        pf.id === fileId ? { ...pf, progress: 0, status: "uploading", error: undefined } : pf
      )
    );
    try {
      const imageCompression = (await import("browser-image-compression")).default;
      const compressed = await imageCompression(item.file as File, {
        maxWidthOrHeight: 1500,
        maxSizeMB: 0.8,
        useWebWorker: true,
      });
      const fd = new FormData();
      fd.append("file", compressed, (item.file as File).name);
      const { data, error } = await uploadImage(fd);
      if (data) {
        const stored: StoredImage = { id: fileId, url: data.url, publicId: data.publicId };
        setUploadFiles((prev) =>
          prev.map((pf) =>
            pf.id === fileId ? { ...pf, progress: 100, status: "completed", result: stored } : pf
          )
        );
        onImagesChange([stored]);
      } else {
        setUploadFiles((prev) =>
          prev.map((pf) =>
            pf.id === fileId
              ? { ...pf, status: "error", error: error?.message ?? "Erro ao fazer upload" }
              : pf
          )
        );
      }
    } catch {
      setUploadFiles((prev) =>
        prev.map((pf) =>
          pf.id === fileId ? { ...pf, status: "error", error: "Erro ao processar imagem" } : pf
        )
      );
    }
  };

  const removeUploadFile = (fileId: string) => {
    removeFile(fileId);
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const completedCount = uploadFiles.filter((f) => f.status === "completed").length;
  const errorCount = uploadFiles.filter((f) => f.status === "error").length;
  const uploadingCount = uploadFiles.filter((f) => f.status === "uploading").length;

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">{label}</h3>

      {uploadFiles.length > 0 && (
        <div className="mb-3 space-y-2">
          {uploadFiles.map((item) => (
            <div key={item.id} className="border-border bg-card rounded-lg border p-2.5">
              <div className="flex items-start gap-2.5">
                <div className="shrink-0">
                  {item.preview ? (
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      className="h-12 w-12 rounded-lg border object-cover"
                    />
                  ) : (
                    <div className="border-border text-muted-foreground flex h-12 w-12 items-center justify-center rounded-lg border">
                      <ImageIcon className="size-4" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="inline-flex flex-col justify-center gap-1 truncate font-medium">
                      <span className="text-sm">{item.file.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {formatBytes(item.file.size)}
                      </span>
                    </p>
                    <Button
                      onClick={() => removeUploadFile(item.id)}
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground size-6 hover:bg-transparent hover:opacity-100"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                  {item.status === "uploading" && (
                    <div className="mt-2">
                      <Progress value={50} className="h-1" />
                    </div>
                  )}
                  {item.status === "error" && item.error && (
                    <Alert variant="destructive" className="mt-2 px-2 py-1">
                      <CircleAlertIcon className="size-4" />
                      <AlertTitle className="text-xs">{item.error}</AlertTitle>
                      <AlertAction>
                        <Button
                          onClick={() => retryUpload(item.id)}
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground size-6 hover:bg-transparent hover:opacity-100"
                        >
                          <RefreshCwIcon className="size-3.5" />
                        </Button>
                      </AlertAction>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative cursor-pointer rounded-lg border border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
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

      {(completedCount > 0 || errorCount > 0 || uploadingCount > 0) && (
        <div className="mt-2 flex items-center gap-2">
          {completedCount > 0 && (
            <span className="bg-success/10 text-success text-sm font-medium">
              {completedCount} concluído{completedCount !== 1 ? "s" : ""}
            </span>
          )}
          {errorCount > 0 && (
            <span className="bg-destructive/10 text-destructive text-xs font-medium">
              {errorCount} erro{errorCount !== 1 ? "s" : ""}
            </span>
          )}
          {uploadingCount > 0 && (
            <span className="bg-muted text-muted-foreground text-xs font-medium">Enviando...</span>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-3">
          <CircleAlertIcon />
          <AlertTitle>Erro no upload</AlertTitle>
          <AlertDescription>
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
