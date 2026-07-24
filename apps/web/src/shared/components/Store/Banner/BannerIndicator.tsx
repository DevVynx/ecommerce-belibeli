type Props = {
  index: number;
  currentIndex: number;
  onClick: () => void;
};

export const BannerIndicator = ({ index, currentIndex, onClick }: Props) => {
  return (
    <button
      key={index}
      onClick={onClick}
      className={`h-4 w-4 rounded-full transition-colors ${
        currentIndex === index ? "bg-white" : "bg-gray-400"
      }`}
    />
  );
};
