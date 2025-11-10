"use client";
import { IconMobileButton } from "@/app/shared/components/IconMobileButton";
import { ArrowLeftIcon, MenuIcon, Verified } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CartHeader = () => {
  const { back } = useRouter();

  return (
    <header className="p-3 lg:bg-white">
      <div className="flex justify-between lg:hidden">
        <IconMobileButton onClick={() => back()}>
          <ArrowLeftIcon className="size-7 md:size-10" />
        </IconMobileButton>
        <h1 className="text-lg font-bold md:text-2xl">Seu Carrinho</h1>
        <IconMobileButton>
          <MenuIcon className="size-7 md:size-10" />
        </IconMobileButton>
      </div>

      <div className="mx-auto hidden justify-between lg:container lg:flex">
        <Link href={"/"}>
          <h1 className="font-kotta hidden cursor-pointer text-3xl font-bold lg:inline-block">
            BeliBeli.com
          </h1>
        </Link>
        <div className="flex items-center gap-1">
          <Verified className="size-6 text-green-500" />
          <span className="text-green-500">Checkout Seguro</span>
        </div>
      </div>
    </header>
  );
};
