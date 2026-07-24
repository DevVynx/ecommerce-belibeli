import Link from "next/link";

import { Logo } from "@/shared/assets/logo/VeloceLogoNoBg";

export const HeaderLogo = () => {
  return (
    <Link href={"/"} className="flex shrink-0 cursor-pointer items-center gap-1 font-bold">
      <Logo />
      <h1 className="font-kotta hidden text-3xl md:inline-block">Veloce.com</h1>
    </Link>
  );
};
