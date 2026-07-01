import { Suspense } from "react";

import { AccountPageContent } from "@/shared/components/Account/AccountPageContent";
import { OrdersSection } from "@/shared/components/Account/OrdersSection";
import { OrdersSectionSkeleton } from "@/shared/components/Account/OrdersSectionSkeleton";
import { ProfileSection } from "@/shared/components/Account/ProfileSection";
import { ProfileSectionSkeleton } from "@/shared/components/Account/ProfileSectionSkeleton";
import { SettingsTab } from "@/shared/components/Account/SettingsTab";
import { TabsContent } from "@/shared/components/shadcn-ui/tabs";

export default async function AccountPage() {
  return (
    <Suspense>
      <AccountPageContent>
        <TabsContent value="profile">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Perfil</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Gerencie suas informações pessoais e endereços.
            </p>
          </div>
          <Suspense fallback={<ProfileSectionSkeleton />}>
            <ProfileSection />
          </Suspense>
        </TabsContent>
        <TabsContent value="orders">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Pedidos</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Acompanhe o histórico e o status dos seus pedidos.
            </p>
          </div>
          <Suspense fallback={<OrdersSectionSkeleton />}>
            <OrdersSection />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Configurações</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Gerencie suas preferências de notificação e segurança da conta.
            </p>
          </div>
          <SettingsTab />
        </TabsContent>
      </AccountPageContent>
    </Suspense>
  );
}
