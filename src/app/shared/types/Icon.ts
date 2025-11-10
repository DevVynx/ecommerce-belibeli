import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type AnimatedIconHandle = {
	startAnimation: () => void;
	stopAnimation: () => void;
};

export type AnimatedIconProps = {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
};

export type AnimatedIconComponent = ForwardRefExoticComponent<
	AnimatedIconProps & RefAttributes<AnimatedIconHandle>
>;