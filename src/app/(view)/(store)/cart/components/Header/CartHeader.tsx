"use client";
import { ArrowLeftIcon, MenuIcon } from "@/assets/Icons";
import { IconMobileButton } from "@/shared/components/IconMobileButton";
import { useRouter } from "next/navigation";

export const CartHeader = () => {
  const { back } = useRouter();

  return (
    <header className="flex justify-between">
      <IconMobileButton onClick={() => back()}>
        <ArrowLeftIcon className="size-7 md:size-10" />
      </IconMobileButton>
      <h1 className="text-lg font-bold md:text-2xl">Seu Carrinho</h1>
      <IconMobileButton>
        <MenuIcon className="size-7 md:size-10" />
      </IconMobileButton>
    </header>
  );
};
