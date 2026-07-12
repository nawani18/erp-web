import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Badge component for statuses, labels, and counters.
 */
const Badge = forwardRef(
    (
        { children, className, variant = "neutral", size = "medium", ...props },
        ref,
    ) => {
        // Base styling for the pill design
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-full";

        // Minimalist, soft-color variants for a clean ERP look
        const variants = {
            primary: "bg-indigo-100 text-indigo-800",
            success: "bg-emerald-100 text-emerald-800",
            warning: "bg-amber-100 text-amber-800",
            danger: "bg-red-100 text-red-800",
            info: "bg-blue-100 text-blue-800",
            neutral: "bg-slate-100 text-slate-800",
        };

        // Size variations
        const sizes = {
            small: "px-2 py-0.5 text-xs",
            medium: "px-2.5 py-1 text-sm",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className,
                )}
                {...props}
            >
                {children}
            </span>
        );
    },
);

Badge.displayName = "Badge";

export default Badge;
