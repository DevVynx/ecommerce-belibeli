"use client";
import type { Variants } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/app/shared/utils/lib/utils";

export interface TrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TrashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LID_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    rotate: [-18, 10, -6, 0],
    y: [-2, -1, -0.5, 0],
    transition: {
      duration: 0.65,
      ease: "easeInOut",
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    x: 0,
    transition: { duration: 0.2 },
  },
  animate: {
    x: [-1.5, 1.5, -1, 1, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
const TrashIcon = forwardRef<TrashIconHandle, TrashIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const shouldReduceMotion = useReducedMotion();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => !shouldReduceMotion && controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current && !shouldReduceMotion) {
          controls.start("animate");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, shouldReduceMotion]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current && !shouldReduceMotion) {
          controls.start("normal");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, shouldReduceMotion]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
        >
          {/* BODY */}
          <motion.g variants={BODY_VARIANTS}>
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          </motion.g>

          {/* LID */}
          <motion.g
            variants={LID_VARIANTS}
            style={{
              transformBox: "fill-box",
              transformOrigin: "50% 100%",
            }}
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

TrashIcon.displayName = "TrashIcon";

export { TrashIcon };
