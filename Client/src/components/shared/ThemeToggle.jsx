import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Sun, Moon, Monitor } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable ThemeToggle component.
 * Manages light, dark, and system color modes, persisting the choice to localStorage.
 */
const ThemeToggle = ({ className, ...props }) => {
    // Initialize state from localStorage or default to 'system'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("erp-theme-preference") || "system";
        }
        return "system";
    });

    const [isOpen, setIsOpen] = useState(false);

    // Apply the theme to the document root whenever it changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove both classes first to reset state
        root.classList.remove("light", "dark");

        if (theme === "system") {
            // Check the operating system's preference
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        // Persist to localStorage
        localStorage.setItem("erp-theme-preference", theme);
    }, [theme]);

    // Listen for system theme changes if the user is in 'system' mode
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (theme === "system") {
                const root = window.document.documentElement;
                root.classList.remove("light", "dark");
                root.classList.add(mediaQuery.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const handleToggle = () => setIsOpen(!isOpen);

    const selectTheme = (newTheme) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    // Determine which icon to show on the main button
    const ActiveIcon =
        theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

    return (
        <div
            className={cn("relative inline-block text-left", className)}
            {...props}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={handleToggle}
                aria-label="Toggle theme"
                aria-expanded={isOpen}
                className={cn(
                    "relative rounded-full p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
                    isOpen && "bg-slate-100 text-slate-900",
                )}
            >
                <ActiveIcon
                    className="h-5 w-5 transition-all"
                    aria-hidden="true"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Invisible backdrop to catch clicks outside the dropdown */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    <div
                        className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden py-1"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <button
                            className={cn(
                                "flex w-full items-center px-4 py-2.5 text-sm transition-colors focus:outline-none",
                                theme === "light"
                                    ? "bg-indigo-50 text-indigo-700 font-medium"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50",
                            )}
                            role="menuitem"
                            onClick={() => selectTheme("light")}
                        >
                            <Sun className="mr-3 h-4 w-4" aria-hidden="true" />
                            Light
                        </button>

                        <button
                            className={cn(
                                "flex w-full items-center px-4 py-2.5 text-sm transition-colors focus:outline-none",
                                theme === "dark"
                                    ? "bg-indigo-50 text-indigo-700 font-medium"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50",
                            )}
                            role="menuitem"
                            onClick={() => selectTheme("dark")}
                        >
                            <Moon className="mr-3 h-4 w-4" aria-hidden="true" />
                            Dark
                        </button>

                        <button
                            className={cn(
                                "flex w-full items-center px-4 py-2.5 text-sm transition-colors focus:outline-none",
                                theme === "system"
                                    ? "bg-indigo-50 text-indigo-700 font-medium"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50",
                            )}
                            role="menuitem"
                            onClick={() => selectTheme("system")}
                        >
                            <Monitor
                                className="mr-3 h-4 w-4"
                                aria-hidden="true"
                            />
                            System
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
