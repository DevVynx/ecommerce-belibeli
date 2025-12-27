import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Kotta_One } from "next/font/google";

import { QueryProvider } from "@/app/shared/providers/QueryProvider";
import { UserInitializer } from "@/app/shared/providers/UserInitializer";
import { WishlistInitializer } from "@/app/shared/providers/WishlistInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const kottaOne = Kotta_One({
  variable: "--font-kotta-one",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeliBeli | Sua Loja Online de Produtos",
  description:
    "Bem-vindo à BeliBeli Store! Explore nossa loja online e encontre os melhores produtos com qualidade e praticidade em um só lugar.",
  icons: "/belilogo.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kottaOne.variable} antialiased`}
      >
        <QueryProvider>
          <UserInitializer>
            <WishlistInitializer>{children}</WishlistInitializer>
          </UserInitializer>
        </QueryProvider>
      </body>
    </html>
  );
}
