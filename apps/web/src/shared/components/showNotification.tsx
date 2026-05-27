"use client";
import { CheckCircle, OctagonX } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/shared/utils/lib/utils";

type ShowNotificationProps = {
  type: "success" | "error";
  title: string;
  message?: string;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onClose?: () => void;
};

const variantStyles = {
  success: {
    container: "border-emerald-200 border-l-emerald-500 bg-emerald-50",
    iconBg: "bg-emerald-100",
    icon: "text-emerald-600",
    title: "text-emerald-900",
    message: "text-emerald-700",
  },
  error: {
    container: "border-red-200 border-l-red-500 bg-red-50",
    iconBg: "bg-red-100",
    icon: "text-red-600",
    title: "text-red-900",
    message: "text-red-700",
  },
} as const;

export const showNotification = ({
  type,
  title,
  message,
  duration = 3000,
  position = "top-right",
  onClose,
}: ShowNotificationProps) => {
  const styles = variantStyles[type];
  const Icon = type === "success" ? CheckCircle : OctagonX;

  toast.custom(
    () => (
      <div
        className={cn(
          "flex w-full items-start gap-3 rounded-lg border border-l-4 px-5 py-3 shadow-lg",
          styles.container
        )}
      >
        <div className={cn("rounded-full p-2", styles.iconBg)}>
          <Icon className={cn("size-6", styles.icon)} />
        </div>

        <div className="min-w-0 flex-1">
          <p className={cn("text-sm leading-tight font-semibold", styles.title)}>{title}</p>
          {message && (
            <p className={cn("mt-0.5 text-sm leading-relaxed", styles.message)}>{message}</p>
          )}
        </div>
      </div>
    ),
    {
      duration,
      position,
      onDismiss: onClose,
      onAutoClose: onClose,
    }
  );
};
