import React, { forwardRef, useState, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from "lucide-react"; // Using lucide-react for password icons

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Input = forwardRef(
    (
        {
            label,
            error,
            helperText,
            className,
            type = "text",
            leftIcon,
            rightIcon,
            disabled = false,
            required = false,
            fullWidth = true,
            ...rest
        },
        ref,
    ) => {
        // Local state for toggling password visibility
        const [showPassword, setShowPassword] = useState(false);

        // Auto-generate a unique ID for accessibility linking (label to input)
        const inputId = useId();

        const isPassword = type === "password";

        // Determine the actual HTML input type to render
        const currentType = isPassword
            ? showPassword
                ? "text"
                : "password"
            : type;

        return (
            <div
                className={cn(
                    "flex flex-col",
                    fullWidth && "w-full",
                    className,
                )}
            >
                {/* Optional Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        {label}
                        {required && (
                            <span
                                className="text-red-500 ml-1"
                                aria-hidden="true"
                            >
                                *
                            </span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {/* Left Icon Placement */}
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            {leftIcon}
                        </div>
                    )}

                    {/* Input Element */}
                    <input
                        id={inputId}
                        ref={ref}
                        type={currentType}
                        disabled={disabled}
                        required={required}
                        className={cn(
                            "block w-full rounded-xl border text-sm transition-all duration-200 ease-in-out",
                            "focus:outline-none focus:ring-2 focus:ring-offset-1",
                            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",

                            // Conditional styling based on error state
                            error
                                ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 hover:border-slate-400",

                            // Dynamic padding based on icon presence to prevent text overlap
                            leftIcon ? "pl-10" : "pl-4",
                            rightIcon || isPassword ? "pr-10" : "pr-4",
                            "py-2.5", // Consistent height
                        )}
                        // Ensure aria-invalid is set for screen readers when there's an error
                        aria-invalid={!!error}
                        {...rest}
                    />

                    {/* Right Side: Password Toggle OR Custom Right Icon */}
                    {isPassword ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={disabled}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none focus:text-indigo-600 disabled:opacity-50 transition-colors"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    ) : rightIcon ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            {rightIcon}
                        </div>
                    ) : null}
                </div>

                {/* Validation Error OR Helper Text Validation */}
                {error ? (
                    <p className="text-sm text-red-600 mt-1.5" role="alert">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-sm text-slate-500 mt-1.5">
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
