import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Veloce Store",
  description: "Finalize seu pedido na Veloce Store.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
