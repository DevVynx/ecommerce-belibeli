"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/shadcn-ui/button";

type ProductDetailsCollapsibleProps = {
  description: string;
};

export const ProductDetailsCollapsible = ({ description }: ProductDetailsCollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border mb-4 rounded-lg border">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
          Detalhes do Produto
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="border-border border-t px-5 py-5">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
};
