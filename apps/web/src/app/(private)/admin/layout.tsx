import type { Metadata } from "next";

import { AdminLayout } from "@/shared/components/Admin/AdminLayout";

export const metadata: Metadata = {
  title: "Painel Administrativo | BeliBeli Store",
  description: "Gerencie seu negócio no painel administrativo da BeliBeli Store.",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
