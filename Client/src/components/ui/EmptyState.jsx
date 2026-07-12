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
 * Reusable EmptyState component for lists, tables, and dashboards
 * when no data is present.
 */
const EmptyState = forwardRef(
    ({ icon, title, description, actionButton, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50",
                    className,
                )}
                {...props}
            >
                {/* Render the icon inside a subtle circular background for emphasis */}
                {icon && (
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        {icon}
                    </div>
                )}

                {/* Main Header / Title */}
                {title && (
                    <h3 className="text-base font-semibold text-slate-900">
                        {title}
                    </h3>
                )}

                {/* Supporting description (e.g., "Get started by adding a new student.") */}
                {description && (
                    <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                        {description}
                    </p>
                )}

                {/* Optional call to action (usually passing the reusable Button component) */}
                {actionButton && <div className="mt-6">{actionButton}</div>}
            </div>
        );
    },
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
