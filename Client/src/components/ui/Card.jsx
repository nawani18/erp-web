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
 * Reusable Card component for dashboards, forms, tables, and statistics.
 * Built with a prop-based structure for quick implementation of standard ERP cards.
 */
const Card = forwardRef(
    (
        { title, subtitle, actions, footer, className, children, ...props },
        ref,
    ) => {
        // Determine if the header section should be rendered
        const hasHeader = title || subtitle || actions;

        return (
            <div
                ref={ref}
                className={cn(
                    "bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col",
                    // No animations or transitions added as per requirements
                    className,
                )}
                {...props}
            >
                {/* Conditional Header Section */}
                {hasHeader && (
                    <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col space-y-1.5">
                            {title && (
                                <h3 className="text-lg font-semibold leading-none text-slate-900">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-slate-500">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Actions (e.g., buttons, filters) aligned to the right on larger screens */}
                        {actions && (
                            <div className="flex items-center shrink-0">
                                {actions}
                            </div>
                        )}
                    </div>
                )}

                {/* Main Body/Content Section */}
                <div className="p-6 flex-1">{children}</div>

                {/* Conditional Footer Section */}
                {footer && (
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);

Card.displayName = "Card";

export default Card;
