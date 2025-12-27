import { ProductOptionDto } from "@repo/types/contracts";

import type { SelectedOptionsState } from "./ProductDetails";
import { ProductOptionSelect } from "./ProductOptionSelect";

type ProductOptionsProps = {
  productOptions: ProductOptionDto[];
  onSelectOption: (optionId: string, valueId: string) => void;
  selectedOptions: SelectedOptionsState | undefined;
};

export const ProductOptions = ({
  productOptions,
  onSelectOption,
  selectedOptions = {}, // Default vazio se undefined
}: ProductOptionsProps) => {
  if (!productOptions || productOptions.length < 1) {
    return <h1 className="text-red-500">Falha ao carregar as opções do produto</h1>;
  }

  const getSelectedValueName = (option: ProductOptionDto): string => {
    const currentSelectedId = selectedOptions[option.id]; // UUID já é string

    if (!currentSelectedId) {
      return "Selecione";
    }

    const selectedValue = option.values.find((value) => value.id === currentSelectedId);

    return selectedValue?.value || "Selecione";
  };

  return (
    <div className="space-y-5">
      {productOptions.map((option) => {
        const currentSelectedId = selectedOptions[option.id];
        const currentSelectedValueName = getSelectedValueName(option);
        const hasSelection = currentSelectedId !== undefined;

        return (
          <div key={option.id}>
            {/* Título e Valor Selecionado */}
            <div className="mb-2 flex items-center gap-2">
              <h1 className="font-bold text-gray-900">{option.type}:</h1>
              <span className={`font-semibold ${hasSelection ? "text-gray-900" : "text-gray-400"}`}>
                {currentSelectedValueName}
              </span>
            </div>

            {/* Botões de Seleção */}
            <div className="flex flex-wrap gap-3">
              {option.values.map((value) => (
                <ProductOptionSelect
                  key={value.id}
                  onClick={() => onSelectOption(option.id, value.id)}
                  value={value.value}
                  isSelected={currentSelectedId === value.id}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
