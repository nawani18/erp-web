import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The 'cn' utility function is a best-practice tool for handling Tailwind CSS classes in React.
 * * 1. clsx: Handles conditional class names (e.g., { 'bg-red-500': hasError }).
 * 2. tailwind-merge: Resolves style conflicts by ensuring that the last class
 * in the chain overrides previous ones (e.g., merging 'px-2' and 'px-4'
 * results in 'px-4' rather than both).
 * * This ensures your components remain clean, modular, and maintainable.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
