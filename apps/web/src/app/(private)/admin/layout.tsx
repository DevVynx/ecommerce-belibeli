import type { Metadata } from "next";

import { AdminLayout } from "@/shared/components/Admin/AdminLayout";

export const metadata: Metadata = {
  title: "Painel Administrativo | Veloce Store",
  description: "Gerencie seu negócio no painel administrativo da Veloce Store.",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
