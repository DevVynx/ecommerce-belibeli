"use client";

import { ExclamationCircleIcon } from "@/assets/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type NotificationProps = {
  title: string;
  message: string;
  duration?: number; // ms
  onClose?: () => void;
};

export const ErrorNotification = ({
  title,
  message,
  duration = 3000,
  onClose,
}: NotificationProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - decrement));
    }, interval);

    const timeout = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed top-6 right-6 z-50 flex w-80 flex-col rounded-lg border border-red-300 bg-red-100 shadow-lg"
      >
        <div className="flex items-start gap-3 p-3 text-red-800">
          <ExclamationCircleIcon className="size-9 stroke-red-500" />
          <div>
            <h1 className="font-bold">{title}</h1>
            <p className="text-sm">{message}</p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="h-1 w-full overflow-hidden rounded-b-lg bg-red-300">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
            className="h-full bg-red-500"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
