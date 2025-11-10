"use client";
import { Button } from "@/app/shared/components/ui/button";
import { CartIcon } from "@/app/shared/components/ui/cart";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/shared/components/ui/empty";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import Link from "next/link";
import { useEffect } from "react";

export const EmptyCart = () => {
  const { handleMouseEnter, handleMouseLeave, iconRef } = useAnimatedIcon();

  useEffect(() => {
    const startTimer = setTimeout(() => {
      iconRef.current?.startAnimation();
      setTimeout(() => {
        iconRef.current?.stopAnimation();
      }, 1000);
    }, 100);
    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia
          variant="default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CartIcon size={60} ref={iconRef} />
        </EmptyMedia>
        <EmptyTitle className="text-3xl font-bold">Seu carrinho está vazio</EmptyTitle>
        <EmptyDescription>
          Explore nossos produtos e encontre algo que combine com você.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={"/"}>
          <Button variant="default" size="lg" className="cursor-pointer font-bold">
            COMPRAR AGORA
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
};
