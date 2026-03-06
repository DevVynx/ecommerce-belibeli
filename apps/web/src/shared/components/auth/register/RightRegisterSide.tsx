"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import ShoppingIllustration from "@/shared/assets/images/corporateMemphis/shopping.svg";

export const RightRegisterSide = () => {
  return (
    <div className="bg-muted hidden h-full flex-2 items-center justify-center lg:flex">
      <motion.div
        layoutId="auth-illustration"
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1 }}
        className="bg-card border-border mx-20 flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-between gap-2 overflow-hidden rounded-3xl border p-12 shadow-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 shrink-0 space-y-3 text-center"
        >
          <h1 className="text-muted-foreground text-4xl font-black 2xl:text-6xl">
            Sua nova{" "}
            <span className="font-kotta text-card-foreground tracking-tight">experiência.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-md text-base font-medium italic 2xl:text-xl">
            "Cadastre-se para descobrir ofertas exclusivas preparadas especialmente para você."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
          className="relative mt-8 flex min-h-0 w-full max-w-2xl flex-1 flex-col items-center justify-center"
        >
          <motion.div
            className="relative h-full w-full"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              alt="Shopping Illustration"
              src={ShoppingIllustration}
              className="mx-auto h-full w-full object-contain select-none"
              priority
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-4 h-4 w-full max-w-[60%] shrink-0 rounded-[100%] bg-black/5 blur-md"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
