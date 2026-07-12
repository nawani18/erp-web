import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Table component for displaying structured data.
 * * @param {Array} columns - Array of objects: { key/accessor, header, render(row), className }
 * @param {Array} data - Array of data objects to display
 * @param {boolean} isLoading - Shows loading state spanning all columns
 * @param {string} emptyTitle - Title for the empty state
 * @param {string} emptyDescription - Description for the empty state
 * @param {boolean} striped - Adds alternate row background colors
 * @param {boolean} hoverable - Adds hover effect to rows
 * @param {boolean} stickyHeader - Makes the header sticky at the top
 * @param {function} onRowClick - Optional callback when a row is clicked
 * @param {function} keyExtractor - Custom function to extract a unique key per row
 */
const Table = ({
    columns = [],
    data = [],
    isLoading = false,
    emptyTitle = "No data found",
    emptyDescription = "There are no records to display at this time.",
    striped = false,
    hoverable = true,
    stickyHeader = false,
    onRowClick,
    keyExtractor = (row, index) => row?.id || index,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm",
                className,
            )}
            {...props}
        >
            <table className="w-full text-left text-sm text-slate-600 border-collapse whitespace-nowrap">
                {/* Table Header */}
                <thead
                    className={cn(
                        "bg-slate-50 border-b border-slate-200",
                        stickyHeader && "sticky top-0 z-10 shadow-sm",
                    )}
                >
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={String(col.key || col.accessor || index)}
                                scope="col"
                                className={cn(
                                    "px-6 py-4 font-semibold text-slate-900",
                                    col.className,
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {/* Loading State */}
                    {isLoading && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 bg-white"
                            >
                                <Loader
                                    variant="inline"
                                    text="Loading data..."
                                />
                            </td>
                        </tr>
                    )}

                    {/* Empty State */}
                    {!isLoading && data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 bg-white"
                            >
                                <EmptyState
                                    title={emptyTitle}
                                    description={emptyDescription}
                                    // Remove default borders and backgrounds from the reusable EmptyState
                                    // so it looks natural inside the table cell
                                    className="border-0 bg-transparent shadow-none"
                                />
                            </td>
                        </tr>
                    )}

                    {/* Data Rows */}
                    {!isLoading &&
                        data.length > 0 &&
                        data.map((row, index) => (
                            <tr
                                key={keyExtractor(row, index)}
                                onClick={() => onRowClick?.(row)}
                                className={cn(
                                    "border-b border-slate-100 last:border-0 bg-white",
                                    striped && "even:bg-slate-50/50",
                                    hoverable &&
                                        "hover:bg-slate-50 transition-colors",
                                    onRowClick && "cursor-pointer",
                                )}
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={`cell-${String(col.key || col.accessor || colIndex)}`}
                                        className={cn(
                                            "px-6 py-4",
                                            col.className,
                                        )}
                                    >
                                        {/* Prioritize custom render function if provided, otherwise fallback to accessor key */}
                                        {col.render
                                            ? col.render(row, index)
                                            : row[col.accessor || col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

Table.displayName = "Table";

export default Table;
