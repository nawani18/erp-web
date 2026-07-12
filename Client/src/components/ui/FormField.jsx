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
 * Reusable FormField wrapper component.
 * It provides a consistent layout for labels, descriptions, errors, and helper text
 * without needing to know anything about the underlying form control (children).
 */
const FormField = forwardRef(
    (
        {
            label,
            required = false,
            description,
            helperText,
            error,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        // Extract the ID from the child if it's a valid React element.
        // This allows the label's htmlFor to automatically connect to the input.
        const childId = React.isValidElement(children)
            ? children.props.id
            : undefined;

        return (
            <div
                ref={ref}
                className={cn("flex flex-col w-full", className)}
                {...props}
            >
                {/* Header Section: Label and Optional Description */}
                {(label || description) && (
                    <div className="mb-1.5 flex flex-col">
                        {label && (
                            <label
                                htmlFor={childId}
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
                        )}

                        {description && (
                            <p className="mt-0.5 text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Main Control Section:
          We render the child directly. If it is a valid React element, we gently clone it
          to inject the `aria-invalid` attribute for screen readers when an error exists.
        */}
                <div className="relative w-full">
                    {React.isValidElement(children)
                        ? React.cloneElement(children, {
                              ...(error ? { "aria-invalid": "true" } : {}),
                          })
                        : children}
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

FormField.displayName = "FormField";

export default FormField;
