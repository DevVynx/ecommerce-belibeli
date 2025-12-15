"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { BadgeAlertIcon } from "@/app/shared/assets/animatedIcons/badge-alert";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import { useScreenSize } from "@/app/shared/hooks/ui/useScreenSize";

type NotificationProps = {
  title: string;
  message: string;
  duration?: number;
  onCloseAction?: () => void;
};

export const ErrorNotification = ({
  title,
  message,
  duration = 3000,
  onCloseAction,
}: NotificationProps) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);
  const { isMobile } = useScreenSize();
  const { iconRef, handleMouseEnter, handleMouseLeave } = useAnimatedIcon();

  useEffect(() => {
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        if (next <= 0) {
          clearInterval(timer);
          setIsVisible(false);
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      iconRef.current?.startAnimation();
      setTimeout(() => {
        iconRef.current?.stopAnimation();
      }, 1000);
    }, 100);
    return () => {
      clearTimeout(startTimer);
    };
  }, [iconRef]);

  return (
    <AnimatePresence onExitComplete={onCloseAction}>
      {isVisible && (
        <motion.div
          key="error-notification"
          initial={isMobile ? { y: -24, opacity: 0 } : { x: 100, opacity: 0 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          exit={isMobile ? { y: -24, opacity: 0 } : { x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={isMobile ? { left: "50%", x: "-50%" } : undefined}
          className={`
            fixed z-50 top-6
            flex w-[90%] flex-col
            rounded-lg border border-red-300 bg-red-100 shadow-lg
            ${isMobile ? "max-w-lg" : "right-6 max-w-sm"}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-start gap-3 p-3 text-red-800">
            <BadgeAlertIcon ref={iconRef} size={35} className="text-red-500" />
            <div className="min-w-0 flex-1">
              <h1 className="font-bold">{title}</h1>
              <p className="text-sm">{message}</p>
            </div>
          </div>

          <div className="h-1 w-full overflow-hidden rounded-b-lg bg-red-300">
            <motion.div
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
              className="h-full bg-red-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
