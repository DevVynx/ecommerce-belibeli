"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import type { AnimatedIconComponent } from "@/app/shared/types/Icon";
import { cn } from "@/app/shared/utils/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/70",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "py-1 rounded-md gap-1.5 px-3",
        lg: "py-2 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ComponentProps<"button"> & {
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
  asChild?: boolean;
  icon?: AnimatedIconComponent;
  iconPosition?: "start" | "end";
  iconSize?: number;
  iconClassName?: string;
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  iconPosition = "end",
  iconSize = 16,
  children,
  onMouseEnter,
  onMouseLeave,
  iconClassName,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const { iconRef, handleMouseEnter, handleMouseLeave } = useAnimatedIcon();

  const handleMouseEnterCombined = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (Icon) {
        handleMouseEnter();
      }
      onMouseEnter?.(e);
    },
    [Icon, handleMouseEnter, onMouseEnter]
  );

  const handleMouseLeaveCombined = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (Icon) {
        handleMouseLeave();
      }
      onMouseLeave?.(e);
    },
    [Icon, handleMouseLeave, onMouseLeave]
  );

  const content = Icon ? (
    <>
      {iconPosition === "start" && <Icon ref={iconRef} size={iconSize} className={iconClassName} />}
      {children}
      {iconPosition === "end" && <Icon ref={iconRef} size={iconSize} />}
    </>
  ) : (
    children
  );

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onMouseEnter={handleMouseEnterCombined}
      onMouseLeave={handleMouseLeaveCombined}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
