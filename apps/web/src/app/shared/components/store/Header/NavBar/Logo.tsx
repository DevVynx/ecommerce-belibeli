import Link from "next/link";

import { Logo } from "@/app/shared/assets/logo/BeliLogoNoBg";

export const HeaderLogo = () => {
  return (
    <Link href={"/"} className="flex cursor-pointer items-center gap-1 font-bold">
      <Logo />
      <h1 className="font-kotta hidden text-3xl lg:inline-block">BeliBeli.com</h1>
    </Link>
  );
};
