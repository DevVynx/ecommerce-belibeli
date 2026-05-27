import { Button } from "@/shared/components/shadcn-ui/button";

type OptionValue = {
  id: string;
  value: string;
};

type Option = {
  id: string;
  name: string;
  values: OptionValue[];
};

type VariantSelectorProps = {
  options: Option[];
  selectedOptions: Record<string, string>;
  onSelectOption: (optionId: string, valueId: string) => void;
};

export const VariantSelector = ({
  options,
  selectedOptions,
  onSelectOption,
}: VariantSelectorProps) => {
  return (
    <div className="mb-6 space-y-6">
      {options.map((option) => {
        const currentSelectedId = selectedOptions[option.id];
        const currentSelectedValueName =
          option.values.find((v) => v.id === currentSelectedId)?.value || "Selecione";
        const hasSelection = currentSelectedId !== undefined;
        const isSizeType = option.name.toLowerCase() === "tamanho";
        const sizeClass = isSizeType && option.values.length > 6 ? "size-10" : "px-4 py-1.5";

        return (
          <div key={option.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                {option.name}:
              </span>
              <span
                className={`font-mono text-sm tracking-widest uppercase ${
                  hasSelection ? "text-foreground" : "text-muted-foreground"
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
                    size="sm"
                    onClick={() => onSelectOption(option.id, value.id)}
                    className={`font-mono text-xs tracking-widest uppercase ${sizeClass} ${
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
