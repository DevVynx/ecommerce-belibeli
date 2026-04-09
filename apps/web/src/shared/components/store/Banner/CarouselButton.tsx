import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
  direction: string;
  onClick: () => void;
};

export const CarouselButton = ({ direction, onClick }: Props) => {
  return (
    <button
      className={`absolute top-1/2 hidden cursor-pointer rounded-full border-2 p-3 text-4xl font-bold text-white transition active:bg-white/70 lg:block ${
        direction === "prev" ? "left-10" : "right-10"
      }`}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <ChevronLeftIcon className="size-7" />
      ) : (
        <ChevronRightIcon className="size-7" />
      )}
    </button>
  );
};
