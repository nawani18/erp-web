import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react"; // Assuming lucide-react is installed as per previous setups

/**
 * Utility function to merge tailwind classes safely.
 * This prevents conflicts if a user passes custom classes (e.g., passing 'bg-red-500' to a primary button).
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = forwardRef(
    (
        {
            children,
            className,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            type = "button",
            ...props
        },
        ref,
    ) => {
        // 1. Define base styles applicable to all buttons
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

        // 2. Define variant-specific styles (Modern ERP Aesthetics)
        const variants = {
            primary:
                "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow",
            secondary:
                "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
            outline:
                "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-indigo-500",
            ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500",
            danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow",
            success:
                "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm hover:shadow",
        };

        // 3. Define size-specific styles
        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        };

        // Determine the final active state. If loading, the button must be functionally disabled.
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className,
                )}
                {...props}
            >
                {/* Conditional rendering for the loading state */}
                {loading && (
                    <Loader2
                        className={cn("animate-spin mr-2", {
                            "h-4 w-4": size === "sm",
                            "h-5 w-5": size === "md",
                            "h-6 w-6": size === "lg",
                        })}
                        aria-hidden="true"
                    />
                )}

                {/* Render children (text, icons, etc.) */}
                {children}
            </button>
        );
    },
);

// Add display name for React DevTools debugging
Button.displayName = "Button";

export default Button;
