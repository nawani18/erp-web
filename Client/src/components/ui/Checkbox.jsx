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
 * Reusable Checkbox component.
 * Supports labels, detailed descriptions, and standard form validation states.
 */
const Checkbox = forwardRef(
    (
        {
            label,
            description,
            error,
            helperText,
            className,
            disabled = false,
            required = false,
            id,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID to link the label and checkbox for accessibility
        const generatedId = useId();
        const checkboxId = id || generatedId;

        return (
            <div className={cn("flex flex-col", className)}>
                <div className="flex items-start">
                    {/* Checkbox Container - fixed height to perfectly align with the first line of text */}
                    <div className="flex h-6 items-center">
                        <input
                            id={checkboxId}
                            ref={ref}
                            type="checkbox"
                            disabled={disabled}
                            required={required}
                            aria-invalid={!!error}
                            aria-describedby={
                                error
                                    ? `${checkboxId}-error`
                                    : helperText || description
                                      ? `${checkboxId}-description`
                                      : undefined
                            }
                            className={cn(
                                "h-4 w-4 rounded border-slate-300 text-indigo-600 transition duration-200 ease-in-out",
                                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
                                "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:checked:bg-slate-300 disabled:border-slate-200",

                                // Conditional styling based on error state
                                error
                                    ? "border-red-300 focus:ring-red-500 text-red-600"
                                    : "hover:border-indigo-400",
                            )}
                            {...props}
                        />
                    </div>

                    {/* Label and Description Section */}
                    {(label || description) && (
                        <div className="ml-3 text-sm leading-6">
                            {label && (
                                <label
                                    htmlFor={checkboxId}
                                    className={cn(
                                        "font-medium text-slate-900 select-none",
                                        disabled &&
                                            "text-slate-500 cursor-not-allowed",
                                    )}
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
                            )}
                            {description && (
                                <p
                                    id={`${checkboxId}-description`}
                                    className={cn(
                                        "text-slate-500",
                                        disabled && "opacity-70",
                                    )}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Section: Error Message OR Helper Text */}
                {error ? (
                    <p
                        id={`${checkboxId}-error`}
                        className="mt-1.5 ml-7 text-sm text-red-600"
                        role="alert"
                    >
                        {error}
                    </p>
                ) : helperText ? (
                    <p
                        id={`${checkboxId}-description`}
                        className="mt-1.5 ml-7 text-sm text-slate-500"
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
