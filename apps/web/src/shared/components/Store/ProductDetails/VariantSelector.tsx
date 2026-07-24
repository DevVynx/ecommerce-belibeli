"use client";
import { Button } from "@/shared/components/shadcn-ui/button";
import { useProductVariantContext } from "@/shared/context/ProductVariantContext";

export const VariantSelector = () => {
  const { options, selectedOptions, setSelectedOptions } = useProductVariantContext();

  const handleSelectOption = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  return (
    <div className="mb-6 space-y-6">
      {options.map((option) => {
        const currentSelectedId = selectedOptions[option.id];
        const currentSelectedValueName =
          option.values.find((v) => v.id === currentSelectedId)?.value || "Selecione";
        const hasSelection = currentSelectedId !== undefined;

        return (
          <div key={option.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-foreground text-sm font-semibold tracking-widest">
                {option.name}:
              </span>
              <span
                className={`text-sm tracking-widest ${
                  hasSelection ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {currentSelectedValueName}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = currentSelectedId === value.id;

                return (
                  <Button
                    key={value.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleSelectOption(option.id, value.id)}
                    className={`px-5 py-2.5 font-mono text-xs tracking-widest uppercase lg:px-4 lg:py-2 ${
                      isSelected ? "" : "text-foreground hover:border-primary"
                    }`}
                  >
                    {value.value}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
