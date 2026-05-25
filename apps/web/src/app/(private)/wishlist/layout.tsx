import { Header } from "@/shared/components/Store/Header/Header";

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
