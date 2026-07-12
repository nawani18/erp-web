import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable IconButton component.
 * Ensures consistent padding, sizing, and accessibility for icon-only actions.
 */
const IconButton = forwardRef(
    (
        {
            children,
            className,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            type = "button",
            "aria-label": ariaLabel,
            title, // Acts as a native tooltip placeholder if a custom tooltip wrapper isn't used
            ...props
        },
        ref,
    ) => {
        // 1. Define base styles applicable to all icon buttons
        const baseStyles =
            "inline-flex items-center justify-center rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shrink-0";

        // 2. Define variant-specific styles
        const variants = {
            primary:
                "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow",
            secondary:
                "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
            ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500",
            danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow",
        };

        // 3. Define size-specific styles (maintains a perfect square)
        // The [&>svg] selectors ensure that any Lucide icons passed as children scale perfectly
        const sizes = {
            sm: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
            md: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
            lg: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
        };

        const isDisabled = disabled || loading;

        // A strict accessibility check for development mode
        if (process.env.NODE_ENV !== "production") {
            if (!ariaLabel && !title) {
                console.warn(
                    "IconButton component requires an `aria-label` or `title` prop for accessibility.",
                );
            }
        }

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                aria-label={ariaLabel || title}
                title={title || ariaLabel}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className,
                )}
                {...props}
            >
                {loading ? (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                ) : (
                    children
                )}
            </button>
        );
    },
);

IconButton.displayName = "IconButton";

export default IconButton;
