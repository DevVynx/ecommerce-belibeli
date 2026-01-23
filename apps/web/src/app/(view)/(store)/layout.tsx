import { Suspense } from "react";

import { Header } from "@/app/shared/components/store/Header/Header";
import { HeaderHeightProvider } from "@/app/shared/contexts/HeaderHeightContext";
import { ProductDetailsProvider } from "@/app/shared/contexts/ProductDetailsContext";
import { SideMenuProvider } from "@/app/shared/contexts/SideMenuMobileContext";
import AuthListenerClient from "@/app/shared/providers/AuthListenerClient";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
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
