"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useNotFound } from "@/shared/contexts/not-found";

const NotFound = () => {
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, [setIsNotFound]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-black p-3">
      <div className="flex flex-col gap-2 bg-black text-center text-white">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="text-lg font-bold">Oops! Página não encontrada</h2>
        <p className="text-zinc-400">
          Parece que o link que você seguiu está quebrado ou a página foi removida.
        </p>
      </div>
      <Link
        href={"/"}
        className="rounded-lg bg-white px-6 py-3 font-bold text-black/90 transition-colors hover:bg-white/80"
      >
        Voltar à Home
      </Link>
      <div className="mt-5 flex gap-8">
        <Link href={"/"} className="rounded-lg text-zinc-400 hover:underline">
          Explorar Produtos
        </Link>
        <Link href={"/"} className="rounded-lg text-zinc-400 hover:underline">
          Ofertas
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
