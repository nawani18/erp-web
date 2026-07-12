import React, { forwardRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Search, X } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable SearchInput component.
 * Includes a built-in debounce mechanism for the `onSearch` callback
 * to prevent excessive API calls while the user is typing.
 */
const SearchInput = forwardRef(
    (
        {
            className,
            placeholder = "Search...",
            onSearch, // Debounced callback function
            debounceMs = 300, // Configurable debounce delay
            value: externalValue,
            onChange,
            ...props
        },
        ref,
    ) => {
        // Local state to ensure the input updates immediately as the user types
        const [localValue, setLocalValue] = useState(externalValue || "");

        // Sync with external value if the component is used as a fully controlled input
        useEffect(() => {
            if (externalValue !== undefined) {
                setLocalValue(externalValue);
            }
        }, [externalValue]);

        // Debounce effect: triggers onSearch only after the user stops typing for `debounceMs`
        useEffect(() => {
            const handler = setTimeout(() => {
                if (onSearch) {
                    onSearch(localValue);
                }
            }, debounceMs);

            // Cleanup function cancels the timeout if the user types again before the delay finishes
            return () => clearTimeout(handler);
        }, [localValue, onSearch, debounceMs]);

        const handleChange = (e) => {
            setLocalValue(e.target.value);
            if (onChange) {
                onChange(e); // Still allow standard onChange tracking if needed by the parent
            }
        };

        const handleClear = () => {
            setLocalValue("");
            if (onChange) {
                // Pass a synthetic-like event for compatibility with standard form handlers
                onChange({ target: { value: "" } });
            }
            if (onSearch) {
                onSearch(""); // Immediately trigger search with empty string when cleared
            }
        };

        return (
            <div className={cn("relative w-full", className)}>
                {/* Left Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Input Field */}
                <input
                    ref={ref}
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={cn(
                        "block w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 transition-colors",
                        "placeholder-slate-400",
                        "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-400",
                    )}
                    {...props}
                />

                {/* Right Clear Button (Conditional) */}
                {localValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none focus:text-indigo-600 transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
            </div>
        );
    },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
