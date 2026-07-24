import { Button } from "@/shared/components/shadcn-ui/button";

type ProductOptionSelectProps = {
  value: string;
  isSelected: boolean;
  onClick: () => void;
};

export const ProductOptionSelect = ({ value, isSelected, onClick }: ProductOptionSelectProps) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      onClick={onClick}
      className={`px-5 py-2.5 font-mono text-xs tracking-widest uppercase lg:px-4 lg:py-2 ${
        isSelected ? "" : "text-foreground hover:border-primary"
      }`}
    >
      {value}
    </Button>
  );
};
