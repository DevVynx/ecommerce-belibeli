"use client";
import { LogOut, Package, Settings, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import { logout } from "@/shared/actions/auth/logout";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Separator } from "@/shared/components/shadcn-ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/shadcn-ui/tabs";
import { useAuthState } from "@/shared/states/auth";
import { clearAllStorages } from "@/shared/utils/store/state/clearAllStorages";

type AccountPageContentProps = {
  children: ReactNode;
};

export const AccountPageContent = ({ children }: AccountPageContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthState();

  const activeTab = searchParams.get("tab") ?? "profile";

  const handleTabChange = (value: string) => {
    router.push(`/account?tab=${value}`, { scroll: false });
  };

  const handleLogout = async () => {
    clearAllStorages();
    await logout();
    router.push("/login");
  };

  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="container mx-auto px-4 py-16 md:px-0">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:flex lg:flex-col lg:gap-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-14 shrink-0 items-center justify-center rounded-full shadow-inner">
                <User className="size-8" />
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>
            <TabsList className="flex h-auto flex-col items-stretch gap-1 bg-transparent p-0">
              <TabsTrigger value="profile" className="hover:bg-muted cursor-pointer justify-start">
                <User className="mr-2 size-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="orders" className="hover:bg-muted cursor-pointer justify-start">
                <Package className="mr-2 size-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="settings" className="hover:bg-muted cursor-pointer justify-start">
                <Settings className="mr-2 size-4" />
                Configurações
              </TabsTrigger>
            </TabsList>
            <Separator className="my-4" />
            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Sair da conta
            </Button>
          </aside>

          <div className="flex flex-col gap-6 px-4 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="bg-primary flex size-12 items-center justify-center rounded-full text-lg font-bold text-white">
                {initial}
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>
            <TabsList className="flex overflow-x-auto">
              <TabsTrigger value="profile">
                <User className="mr-1 size-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Package className="mr-1 size-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-1 size-4" />
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-w-0">{children}</div>
        </div>
      </Tabs>
    </div>
  );
};
