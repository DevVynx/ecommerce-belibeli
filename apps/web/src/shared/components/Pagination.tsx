"use client";

import { useState } from "react";

import { Button } from "@/shared/components/shadcn-ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const [editingEllipsis, setEditingEllipsis] = useState<string | null>(null);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
        .map((p, idx, arr) => {
          const items: React.ReactNode[] = [];

          if (idx > 0 && p - arr[idx - 1]! > 1) {
            const ellipsisKey = `ellipsis-${p}`;
            const isEditing = editingEllipsis === ellipsisKey;

            items.push(
              isEditing ? (
                <input
                  key={ellipsisKey}
                  type="number"
                  placeholder="..."
                  min={1}
                  max={totalPages}
                  autoFocus
                  className="border-input bg-background inline-flex h-9 w-12 [appearance:textfield] items-center justify-center rounded-lg border text-center text-sm [&::-webkit-inner-spin-button]:appearance-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = Number((e.target as HTMLInputElement).value);
                      if (val >= 1 && val <= totalPages) onPageChange(val);
                      setEditingEllipsis(null);
                    }
                    if (e.key === "Escape") {
                      setEditingEllipsis(null);
                    }
                  }}
                  onBlur={() => setEditingEllipsis(null)}
                />
              ) : (
                <Button
                  key={ellipsisKey}
                  variant="ghost"
                  size="sm"
                  className="min-w-9"
                  onClick={() => setEditingEllipsis(ellipsisKey)}
                >
                  ...
                </Button>
              )
            );
          }

          items.push(
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="sm"
              className="min-w-9"
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          );

          return items;
        })}

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Próximo
      </Button>
    </div>
  );
}
