import { useCallback, useEffect, useRef } from "react";

import type { AnimatedIconHandle } from "@/app/shared/types/Icon";

/**
 * Hook to manage multiple animated icon animations with a single setup.
 *
 * This hook simplifies managing multiple animated icons in a component by providing
 * a clean API to create icon refs and their associated handlers.
 *
 * @param config - Configuration for animated icons
 * @param config.autoStartDelay - Optional delay (ms) to auto-start animations on mount. Animations will continue until manually stopped or until autoStartDuration completes (if defined)
 * @param config.autoStartDuration - Optional duration (ms) for how long to keep animations running. Only used if autoStartDelay is also defined
 *
 * @returns Object containing:
 *   - getIconRef: Function to get a ref for a specific icon ID
 *   - getHandlers: Function to get mouse enter/leave handlers for a specific icon ID
 *   - startAnimation: Function to manually start animation for a specific icon ID
 *   - stopAnimation: Function to manually stop animation for a specific icon ID
 *   - startAllAnimations: Function to start animations for all icons
 *   - stopAllAnimations: Function to stop animations for all icons
 *
 * @example
 * Basic usage with multiple icons:
 * ```tsx
 * const { getIconRef, getHandlers } = useAnimatedIcons();
 *
 * return (
 *   <>
 *     <Button {...getHandlers('arrow1')}>
 *       Action 1
 *       <ArrowIcon ref={getIconRef('arrow1')} />
 *     </Button>
 *     <Button {...getHandlers('arrow2')}>
 *       Action 2
 *       <ArrowIcon ref={getIconRef('arrow2')} />
 *     </Button>
 *   </>
 * );
 * ```
 *
 * @example
 * With auto-start animation (continues indefinitely):
 * ```tsx
 * const { getIconRef, getHandlers } = useAnimatedIcons({
 *   autoStartDelay: 200, // Start after 200ms, continues until manually stopped
 * });
 * ```
 *
 * @example
 * With auto-start and auto-stop animation:
 * ```tsx
 * const { getIconRef, getHandlers } = useAnimatedIcons({
 *   autoStartDelay: 200,      // Start after 200ms
 *   autoStartDuration: 1000,  // Stop after 1 second
 * });
 * ```
 */
export const useAnimatedIcons = ({
  autoStartDelay,
  autoStartDuration,
}: {
  autoStartDelay?: number;
  autoStartDuration?: number;
} = {}) => {
  const iconRefsMap = useRef<Map<string, AnimatedIconHandle | null>>(new Map());

  const getIconRef = useCallback((id: string) => {
    return (ref: AnimatedIconHandle | null) => {
      iconRefsMap.current.set(id, ref);
    };
  }, []);

  const startAnimation = useCallback((id: string) => {
    const icon = iconRefsMap.current.get(id);
    icon?.startAnimation();
  }, []);

  const stopAnimation = useCallback((id: string) => {
    const icon = iconRefsMap.current.get(id);
    icon?.stopAnimation();
  }, []);

  const startAllAnimations = useCallback(() => {
    iconRefsMap.current.forEach((icon) => {
      icon?.startAnimation();
    });
  }, []);

  const stopAllAnimations = useCallback(() => {
    iconRefsMap.current.forEach((icon) => {
      icon?.stopAnimation();
    });
  }, []);

  const getHandlers = useCallback(
    (id: string) => ({
      onMouseEnter: () => startAnimation(id),
      onMouseLeave: () => stopAnimation(id),
    }),
    [startAnimation, stopAnimation]
  );

  // Auto-start animations if configured
  useEffect(() => {
    if (autoStartDelay === undefined) return;

    const startTimer = setTimeout(() => {
      startAllAnimations();

      // Se duration foi definido, parar após o tempo especificado
      if (autoStartDuration !== undefined) {
        const stopTimer = setTimeout(() => {
          stopAllAnimations();
        }, autoStartDuration);
        return () => clearTimeout(stopTimer);
      }
    }, autoStartDelay);

    return () => clearTimeout(startTimer);
  }, [autoStartDelay, autoStartDuration, startAllAnimations, stopAllAnimations]);

  return {
    getIconRef,
    getHandlers,
    startAnimation,
    stopAnimation,
    startAllAnimations,
    stopAllAnimations,
  };
};
