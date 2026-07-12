import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable PageHeader component.
 * Standardizes the layout of page titles, descriptions, breadcrumbs,
 * and action buttons across the entire College ERP application.
 */
const PageHeader = ({
    title,
    description,
    breadcrumbs = [],
    actions,
    children,
    className,
    ...props
}) => {
    return (
        <header
            className={cn(
                // Base layout with large whitespace and bottom border
                "flex flex-col gap-4 pb-6 mb-6 border-b border-slate-200",
                // Sticky support ready (pass `sticky top-0 bg-white z-10` via className if needed)
                className,
            )}
            {...props}
        >
            {/* Breadcrumbs Navigation */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center flex-wrap gap-y-1 text-sm text-slate-500">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <li
                                    key={`crumb-${index}`}
                                    className="flex items-center"
                                >
                                    {/* Render as link if it has an href and isn't the active page */}
                                    {crumb.href && !isLast ? (
                                        <a
                                            href={crumb.href}
                                            className="hover:text-indigo-600 transition-colors focus:outline-none focus:underline"
                                        >
                                            {crumb.label}
                                        </a>
                                    ) : (
                                        /* Render as plain text if it's the current/last page or has no href */
                                        <span
                                            className={cn(
                                                isLast
                                                    ? "text-slate-900 font-medium"
                                                    : "text-slate-500",
                                            )}
                                            aria-current={
                                                isLast ? "page" : undefined
                                            }
                                        >
                                            {crumb.label}
                                        </span>
                                    )}

                                    {/* Separator Icon */}
                                    {!isLast && (
                                        <ChevronRight
                                            className="h-4 w-4 mx-1.5 text-slate-400 shrink-0"
                                            aria-hidden="true"
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            )}

            {/* Main Header Content: Title, Description, and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Title & Description Container */}
                <div className="flex flex-col">
                    {title && (
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="mt-1.5 text-sm sm:text-base text-slate-500 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>

                {/* Action Buttons Container */}
                {actions && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-2 sm:mt-0">
                        {actions}
                    </div>
                )}
            </div>

            {/* Optional Children (e.g., Tabs, Filters, or Status Banners underneath the header) */}
            {children && <div className="mt-4 pt-2">{children}</div>}
        </header>
    );
};

PageHeader.displayName = "PageHeader";

export default PageHeader;
