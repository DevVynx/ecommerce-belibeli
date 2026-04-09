import { Header } from "@/shared/components/store/Header/Header";
import { ProductDetailsProvider } from "@/shared/contexts/ProductDetailsContext";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductDetailsProvider>
      <Header />
      {children}
    </ProductDetailsProvider>
  );
}
