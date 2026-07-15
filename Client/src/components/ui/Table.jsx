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
 * Reusable Table component for displaying structured data across all ERP modules.
 * Supports dynamic columns, custom rendering, sticky headers, and striped rows.
 */
const Table = ({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No records found.",
    rowKey = "id",
    onRowClick,
    className,
    children,
    ...props
}) => {
    // Helper to resolve row keys dynamically (supports both string and function)
    const getRowKey = (row, index) => {
        if (typeof rowKey === "function") {
            return rowKey(row, index);
        }
        return row[rowKey] || index;
    };

    // Helper to map align prop to Tailwind text alignment classes
    const getAlignmentClass = (align) => {
        switch (align) {
            case "center":
                return "text-center";
            case "right":
                return "text-right";
            case "left":
            default:
                return "text-left";
        }
    };

    return (
        <div
            className={cn(
                "w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col relative",
                className,
            )}
            {...props}
        >
            <table className="w-full text-left text-sm text-slate-600 border-collapse whitespace-nowrap">
                {/* Sticky Table Header */}
                <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.05)]">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={String(col.accessor || index)}
                                scope="col"
                                className={cn(
                                    "px-6 py-4 font-semibold text-slate-900",
                                    getAlignmentClass(col.align),
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
                    {loading && (
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
                    {!loading && data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 bg-white"
                            >
                                <EmptyState
                                    title={emptyMessage}
                                    className="border-0 bg-transparent shadow-none p-0 md:p-0"
                                />
                            </td>
                        </tr>
                    )}

                    {/* Data Rows */}
                    {!loading &&
                        data.length > 0 &&
                        data.map((row, index) => (
                            <tr
                                key={getRowKey(row, index)}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={cn(
                                    "border-b border-slate-100 last:border-0 bg-white transition-colors",
                                    "even:bg-slate-50/50 hover:bg-slate-50", // Zebra striping & hover
                                    onRowClick && "cursor-pointer",
                                )}
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={`cell-${String(col.accessor || colIndex)}`}
                                        className={cn(
                                            "px-6 py-4",
                                            getAlignmentClass(col.align),
                                            col.className,
                                        )}
                                    >
                                        {/* Render via custom function if provided, else use the object accessor */}
                                        {col.render
                                            ? col.render(row, index)
                                            : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Optional Children (e.g., Table Footer or external Pagination components) */}
            {children && (
                <div className="border-t border-slate-200 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

Table.displayName = "Table";

export default Table;
