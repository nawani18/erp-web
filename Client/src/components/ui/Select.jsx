import React, { forwardRef, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Select component utilizing native HTML <select>.
 * Supports flat option arrays, grouped options via <optgroup>, and arbitrary children.
 */
const Select = forwardRef(
    (
        {
            label,
            options = [],
            placeholder,
            error,
            helperText,
            className,
            disabled = false,
            required = false,
            id,
            children,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID for accessibility if an explicit ID is not provided
        const generatedId = useId();
        const selectId = id || generatedId;

        return (
            <div className={cn("flex flex-col w-full", className)}>
                {/* Label Section */}
                {label && (
                    <label
                        htmlFor={selectId}
                        className="mb-1.5 block text-sm font-medium text-slate-700"
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

                {/* Select Control Section */}
                <div className="relative">
                    <select
                        id={selectId}
                        ref={ref}
                        disabled={disabled}
                        required={required}
                        aria-invalid={!!error}
                        // `appearance-none` removes default OS select styles so our custom chevron works perfectly
                        className={cn(
                            "block w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm transition-all duration-200 ease-in-out",
                            "focus:outline-none focus:ring-2 focus:ring-offset-1",
                            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",

                            // Error vs Normal state styling
                            error
                                ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 hover:border-slate-400",
                        )}
                        // Ensure controlled vs uncontrolled value defaults to empty string if a placeholder is used
                        defaultValue={
                            placeholder && props.value === undefined
                                ? ""
                                : undefined
                        }
                        {...props}
                    >
                        {/* Placeholder option (disabled and hidden so it can't be re-selected) */}
                        {placeholder && (
                            <option value="" disabled hidden>
                                {placeholder}
                            </option>
                        )}

                        {/* Dynamic Options Rendering */}
                        {options.map((option, index) => {
                            // Support for <optgroup> (grouped options)
                            if (
                                option.options &&
                                Array.isArray(option.options)
                            ) {
                                return (
                                    <optgroup
                                        key={`group-${index}`}
                                        label={option.label}
                                    >
                                        {option.options.map(
                                            (childOption, childIndex) => (
                                                <option
                                                    key={`child-${childIndex}`}
                                                    value={childOption.value}
                                                >
                                                    {childOption.label}
                                                </option>
                                            ),
                                        )}
                                    </optgroup>
                                );
                            }

                            // Standard flat option rendering
                            return (
                                <option
                                    key={`opt-${index}`}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            );
                        })}

                        {/* Allow direct passing of <option> children as a flexible fallback */}
                        {children}
                    </select>

                    {/* Custom Dropdown Chevron */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </div>
                </div>

                {/* Footer Section: Error or Helper Text */}
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

Select.displayName = "Select";

export default Select;
