import Image from "next/image";

import logo from "./belilogo-nobg.png";

type Props = {
  width?: number;
  height?: number;
  onClick?: () => void;
};

export const Logo = ({ width = 40, height = 0, onClick }: Props) => {
  return (
    <Image
      onClick={onClick}
      src={logo}
      alt="logo"
      width={width}
      height={height}
      className="cursor-pointer lg:hidden"
    />
  );
};
