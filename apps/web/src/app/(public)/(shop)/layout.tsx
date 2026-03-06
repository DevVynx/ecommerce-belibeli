import { Suspense } from "react";

import { Header } from "@/shared/components/store/Header/Header";
import { HeaderHeightProvider } from "@/shared/contexts/HeaderHeightContext";
import { ProductDetailsProvider } from "@/shared/contexts/ProductDetailsContext";
import { SideMenuProvider } from "@/shared/contexts/SideMenuMobileContext";
import AuthListenerClient from "@/shared/providers/AuthListenerClient";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AuthListenerClient>
        <HeaderHeightProvider>
          <ProductDetailsProvider>
            <SideMenuProvider>
              <Header />
              {children}
            </SideMenuProvider>
          </ProductDetailsProvider>
        </HeaderHeightProvider>
      </AuthListenerClient>
    </Suspense>
  );
}
