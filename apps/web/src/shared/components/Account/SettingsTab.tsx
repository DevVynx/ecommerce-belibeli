"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/shared/actions/auth/logout";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Separator } from "@/shared/components/shadcn-ui/separator";
import { Switch } from "@/shared/components/shadcn-ui/switch";
import { clearAllStorages } from "@/shared/utils/store/state/clearAllStorages";

import { SecuritySection } from "./SecuritySection";

export const SettingsTab = () => {
  const router = useRouter();

  const handleLogout = async () => {
    clearAllStorages();
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Notifications */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Notificações</h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">E-mails promocionais</p>
              <p className="text-muted-foreground text-xs">Receba ofertas e novidades da Veloce</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Notificações de pedido</p>
              <p className="text-muted-foreground text-xs">
                Saiba quando o status do seu pedido mudar
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <SecuritySection />

      {/* Logout */}
      <div className="rounded-lg border p-6 lg:hidden">
        <Button
          variant="outline"
          className="w-full cursor-pointer text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          Sair da conta
        </Button>
      </div>
    </div>
  );
};
