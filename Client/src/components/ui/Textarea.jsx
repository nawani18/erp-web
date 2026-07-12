import React, { forwardRef, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Textarea component for multiline text inputs.
 * Ideal for remarks, notes, announcements, and addresses.
 */
const Textarea = forwardRef(
    (
        {
            label,
            placeholder,
            error,
            helperText,
            className,
            disabled = false,
            required = false,
            rows = 4,
            resize = "vertical", // 'none' | 'vertical' | 'horizontal' | 'both'
            id,
            maxLength,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID to link the label and textarea for accessibility
        const generatedId = useId();
        const textareaId = id || generatedId;

        // Map the resize prop to Tailwind CSS classes
        const resizeClass =
            {
                none: "resize-none",
                vertical: "resize-y",
                horizontal: "resize-x",
                both: "resize",
            }[resize] || "resize-y";

        return (
            <div className={cn("flex flex-col w-full", className)}>
                {/* Label Section */}
                {label && (
                    <div className="mb-1.5 flex items-center justify-between">
                        <label
                            htmlFor={textareaId}
                            className="block text-sm font-medium text-slate-700"
                        >
                            {label}
                            {required && (
                                <span
                                    className="ml-1 text-red-500"
                                    aria-hidden="true"
                                    title="Required"
                                >
                                    *
                                </span>
                            )}
                        </label>

                        {/* Optional character counter hint if maxLength is provided */}
                        {maxLength && !error && !disabled && (
                            <span className="text-xs text-slate-400">
                                Max {maxLength} characters
                            </span>
                        )}
                    </div>
                )}

                {/* Textarea Control */}
                <div className="relative">
                    <textarea
                        id={textareaId}
                        ref={ref}
                        rows={rows}
                        disabled={disabled}
                        required={required}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        className={cn(
                            "block w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 ease-in-out",
                            "focus:outline-none focus:ring-2 focus:ring-offset-1",
                            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
                            resizeClass,

                            // Conditional styling based on error state
                            error
                                ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 hover:border-slate-400",
                        )}
                        {...props}
                    />
                </div>

                {/* Footer Section: Error Message OR Helper Text */}
                {error ? (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="mt-1.5 text-sm text-slate-500">
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    },
);

Textarea.displayName = "Textarea";

export default Textarea;
