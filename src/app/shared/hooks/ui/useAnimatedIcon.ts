import type { AnimatedIconHandle } from "@/app/shared/types/Icon";
import { useCallback, useRef } from "react";

/**
 * Hook to control animated icon animations from parent element hover events.
 * 
 * This hook creates a ref that connects to an animated icon component and provides
 * handlers to trigger animations on mouse enter/leave events. The animated icon
 * must implement `startAnimation()` and `stopAnimation()` methods.
 * 
 * @returns Object containing:
 *   - iconRef: Ref to attach to the animated icon component
 *   - handleMouseEnter: Handler to trigger animation start
 *   - handleMouseLeave: Handler to trigger animation stop
 * 
 * @example
 * Basic usage with a button:
 * ```tsx
 * const { iconRef, handleMouseEnter, handleMouseLeave } = useAnimatedIcon();
 * 
 * return (
 *   <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
 *     <AnimatedIcon ref={iconRef} />
 *     <span>Hover me!</span>
 *   </button>
 * );
 * ```
 * 
 * @example
 * Usage with a Link component:
 * ```tsx
 * const { iconRef, handleMouseEnter, handleMouseLeave } = useAnimatedIcon();
 * 
 * return (
 *   <Link 
 *     href="/path"
 *     onMouseEnter={handleMouseEnter} 
 *     onMouseLeave={handleMouseLeave}
 *   >
 *     <Bell ref={iconRef} size={18} />
 *     <span>Notifications</span>
 *   </Link>
 * );
 * ```
 */
export const useAnimatedIcon = () => {
	const iconRef = useRef<AnimatedIconHandle | null>(null);

	const handleMouseEnter = useCallback(() => {
		iconRef.current?.startAnimation();
	}, []);

	const handleMouseLeave = useCallback(() => {
		iconRef.current?.stopAnimation();
	}, []);

	return {
		iconRef,
		handleMouseEnter,
		handleMouseLeave,
	};
};
