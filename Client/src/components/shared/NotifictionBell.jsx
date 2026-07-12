import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Bell } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable NotificationBell component.
 * Features an integrated popover, unread badge logic, and a loading skeleton placeholder.
 */
const NotificationBell = ({
    count = 0,
    isLoading = false,
    onClick,
    className,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close the popover when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (onClick) {
            onClick(); // Parent can use this to mark notifications as read or fetch data
        }
    };

    // Prevent badge from breaking layout if the count is extremely high
    const displayCount = count > 99 ? "99+" : count;

    return (
        <div
            className={cn("relative inline-block", className)}
            ref={containerRef}
            {...props}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={handleToggle}
                aria-label="View notifications"
                aria-expanded={isOpen}
                className={cn(
                    "relative rounded-full p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
                    isOpen && "bg-slate-100 text-slate-900",
                )}
            >
                <Bell className="h-5 w-5" aria-hidden="true" />

                {/* Unread Badge */}
                {count > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
                        {displayCount}
                    </span>
                )}
            </button>

            {/* Popover Placeholder */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden flex flex-col max-h-[400px]"
                    role="menu"
                    aria-orientation="vertical"
                >
                    {/* Popover Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 shrink-0">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Notifications
                        </h3>
                        {count > 0 && (
                            <span className="text-xs font-medium text-indigo-600 cursor-pointer hover:underline">
                                Mark all as read
                            </span>
                        )}
                    </div>

                    {/* Popover Body */}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                            // Loading Skeleton Placeholder
                            <div className="flex flex-col">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={`skeleton-${i}`}
                                        className="flex items-start gap-3 p-4 border-b border-slate-50 last:border-0"
                                    >
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 animate-pulse" />
                                        <div className="flex flex-col gap-2 flex-1 pt-1">
                                            <div className="h-3.5 bg-slate-200 rounded w-3/4 animate-pulse" />
                                            <div className="h-2.5 bg-slate-200 rounded w-1/2 animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : count > 0 ? (
                            // Static Example Data Placeholder
                            <div className="flex flex-col">
                                <div className="flex items-start gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-indigo-600 shrink-0" />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-slate-900 font-medium">
                                            New assignment posted
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Prof. Smith added a new assignment
                                            in Computer Networks.
                                        </p>
                                        <span className="text-[11px] text-slate-400 mt-1">
                                            2 hours ago
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-transparent shrink-0" />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-slate-900">
                                            System maintenance
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            ERP will be down for maintenance at
                                            midnight.
                                        </p>
                                        <span className="text-[11px] text-slate-400 mt-1">
                                            1 day ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Empty State Placeholder
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <Bell
                                    className="h-8 w-8 text-slate-300 mb-3"
                                    aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-slate-900">
                                    All caught up!
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    You have no new notifications.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Popover Footer */}
                    <div className="border-t border-slate-100 p-2 shrink-0">
                        <button className="w-full rounded-lg py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

NotificationBell.displayName = "NotificationBell";

export default NotificationBell;
