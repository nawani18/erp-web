import React from "react";
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
 * Reusable Loader component for inline spinners and fullscreen loading states.
 */
const Loader = ({
    variant = "inline",
    size = "medium",
    className,
    text,
    ...props
}) => {
    // Define size variations for the spinner icon
    const sizes = {
        small: "h-5 w-5",
        medium: "h-8 w-8",
        large: "h-12 w-12",
    };

    // Define layout variants
    const variants = {
        inline: "inline-flex flex-col items-center justify-center p-4",
        fullscreen:
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm",
    };

    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(variants[variant], className)}
            {...props}
        >
            <Loader2
                className={cn("animate-spin text-indigo-600", sizes[size])}
                aria-hidden="true"
            />

            {/* Render visible text if provided, otherwise render screen-reader only text 
        to ensure accessibility compliance.
      */}
            {text ? (
                <span className="mt-3 text-sm font-medium text-slate-600 animate-pulse">
                    {text}
                </span>
            ) : (
                <span className="sr-only">Loading...</span>
            )}
        </div>
    );
};

Loader.displayName = "Loader";

export default Loader;
