import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Pagination component for tables, lists, and data grids.
 * Automatically handles page number truncations for large datasets.
 */
const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    className,
    ...props
}) => {
    // Helper to generate the pagination array with ellipsis logic
    const getPageNumbers = () => {
        // If there are 7 or fewer pages, just show all of them
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // If we are near the beginning
        if (currentPage <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        // If we are near the end
        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        // If we are somewhere in the middle
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const pages = getPageNumbers();

    return (
        <nav
            className={cn(
                "flex items-center justify-between w-full",
                className,
            )}
            aria-label="Pagination"
            {...props}
        >
            {/* Mobile view: simplified Prev/Next controls */}
            <div className="flex flex-1 items-center justify-between sm:hidden gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="relative inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="relative inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>

            {/* Desktop view: full pagination with page numbers */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                {/* Total Page Info Summary */}
                <div>
                    <p className="text-sm text-slate-600">
                        Showing page{" "}
                        <span className="font-semibold text-slate-900">
                            {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-900">
                            {totalPages}
                        </span>
                    </p>
                </div>

                {/* Page Number Actions */}
                <div>
                    <ul className="flex items-center gap-1">
                        {/* Previous Arrow */}
                        <li>
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                aria-label="Previous page"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                        </li>

                        {/* Individual Page Numbers */}
                        {pages.map((page, index) => {
                            // Render Ellipsis
                            if (page === "...") {
                                return (
                                    <li key={`ellipsis-${index}`}>
                                        <span className="inline-flex h-9 w-9 items-center justify-center text-slate-400">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </span>
                                    </li>
                                );
                            }

                            const isCurrent = page === currentPage;

                            return (
                                <li key={`page-${page}`}>
                                    <button
                                        onClick={() => onPageChange(page)}
                                        aria-current={
                                            isCurrent ? "page" : undefined
                                        }
                                        className={cn(
                                            "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500",
                                            isCurrent
                                                ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                                                : "text-slate-700 hover:bg-slate-100",
                                        )}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}

                        {/* Next Arrow */}
                        <li>
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                aria-label="Next page"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Pagination.displayName = "Pagination";

export default Pagination;
