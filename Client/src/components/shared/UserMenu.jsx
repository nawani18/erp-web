import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Avatar from "../ui/Avatar";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable UserMenu component for the Navbar.
 * Provides a dropdown for accessing profile, settings, and logging out.
 */
const UserMenu = ({
    user = {
        name: "Admin User",
        role: "Administrator",
        avatarUrl: null, // Can pass an image URL here
    },
    onLogout,
    className,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close the dropdown when clicking outside of it
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

    // Handle keyboard navigation (Escape to close)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isOpen && event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleToggle = () => setIsOpen(!isOpen);

    // Helper for closing the menu before executing an action
    const handleAction = (actionFn) => {
        setIsOpen(false);
        if (actionFn) actionFn();
    };

    return (
        <div
            className={cn("relative inline-block text-left", className)}
            ref={containerRef}
            {...props}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={handleToggle}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={cn(
                    "flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
                    isOpen && "bg-slate-50",
                )}
            >
                <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                <div className="hidden flex-col items-start md:flex">
                    <span className="text-sm font-medium text-slate-900 leading-tight">
                        {user.name}
                    </span>
                    <span className="text-xs text-slate-500 leading-tight">
                        {user.role}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-slate-400 transition-transform duration-200 hidden md:block",
                        isOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                >
                    {/* Mobile Header (Visible only on small screens where the trigger text is hidden) */}
                    <div className="border-b border-slate-100 px-4 py-3 md:hidden bg-slate-50/50">
                        <p className="text-sm font-medium text-slate-900 truncate">
                            {user.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                            {user.role}
                        </p>
                    </div>

                    <div className="py-1" role="none">
                        {/* Profile Action */}
                        <button
                            className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus:bg-slate-50 focus:outline-none"
                            role="menuitem"
                            onClick={() =>
                                handleAction(() =>
                                    console.log("Navigate to Profile"),
                                )
                            }
                        >
                            <User
                                className="mr-3 h-4 w-4 text-slate-400"
                                aria-hidden="true"
                            />
                            My Profile
                        </button>

                        {/* Settings Action */}
                        <button
                            className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus:bg-slate-50 focus:outline-none"
                            role="menuitem"
                            onClick={() =>
                                handleAction(() =>
                                    console.log("Navigate to Settings"),
                                )
                            }
                        >
                            <Settings
                                className="mr-3 h-4 w-4 text-slate-400"
                                aria-hidden="true"
                            />
                            Account Settings
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        {/* Logout Action */}
                        <button
                            className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors focus:bg-red-50 focus:outline-none"
                            role="menuitem"
                            onClick={() => handleAction(onLogout)}
                        >
                            <LogOut
                                className="mr-3 h-4 w-4 text-red-500"
                                aria-hidden="true"
                            />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

UserMenu.displayName = "UserMenu";

export default UserMenu;
