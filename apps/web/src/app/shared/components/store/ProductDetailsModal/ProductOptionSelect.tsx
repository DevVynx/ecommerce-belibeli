type ProductOptionSelectProps = {
  value: string;
  isSelected: boolean;
  onClick: () => void;
};

export const ProductOptionSelect = ({ value, isSelected, onClick }: ProductOptionSelectProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition-all duration-200 ${
        isSelected
          ? "border-gray-600 bg-gray-600 text-white shadow-md"
          : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      } `}
    >
      {value}
    </button>
  );
};
