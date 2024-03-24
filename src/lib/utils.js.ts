import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	element: Element,
	options: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(element);
	const transform = style.transform === 'none' ? '' : style.transform;

	const convertScale = (value: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (value - minA) / (maxA - minA);
		const newValue = percentage * (maxB - minB) + minB;

		return newValue;
	};

	const buildStyleString = (styleObject: Record<string, number | string | undefined>) => {
		return Object.entries(styleObject)
			.filter(([_, value]) => value !== undefined)
			.map(([key, value]) => `${key}:${value};`)
			.join('');
	};

	return {
		duration: options.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = convertScale(t, [0, 1], [options.y ?? 5, 0]);
			const x = convertScale(t, [0, 1], [options.x ?? 0, 0]);
			const scale = convertScale(t, [0, 1], [options.start ?? 0.95, 1]);

			const style = {
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			};

			return buildStyleString(style);
		},
		easing: cubicOut
	};
};
