import type { Metadata } from "next";

import { Header } from "@/shared/components/Store/Header/Header";

export const metadata: Metadata = {
  title: "Lista de Desejos | Veloce Store",
  description:
    "Gerencie sua lista de desejos na Veloce Store e não perca seus produtos favoritos.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
