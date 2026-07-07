import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo | BeliBeli Store",
  description: "Gerencie seu negócio no painel administrativo da BeliBeli Store.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
