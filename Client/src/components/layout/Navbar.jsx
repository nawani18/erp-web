import { Search, Menu } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import NotificationBell from "../shared/NotifictionBell";
import UserMenu from "../shared/UserMenu";
import ThemeToggle from "../shared/ThemeToggle";

const Navbar = ({ onMenuClick, breadcrumbs = [] }) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 transition-all duration-300">
            {/* Left Section: Mobile Menu Toggle & Breadcrumbs */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden transition-colors"
                    aria-label="Open sidebar"
                >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Breadcrumb - Hidden on smaller screens for cleaner UI */}
                <div className="hidden md:flex">
                    <Breadcrumb items={breadcrumbs} />
                </div>
            </div>

            {/* Right Section: Search & Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                {/* Search Input - Responsive sizing */}
                <div className="relative hidden sm:block group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search
                            className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 md:w-56 lg:w-72 transition-all duration-200"
                        aria-label="Search"
                    />
                </div>

                {/* Vertical Divider */}
                <div
                    className="hidden h-6 w-px bg-slate-200 sm:block"
                    aria-hidden="true"
                />

                {/* Modular Action Components */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <ThemeToggle />
                    <NotificationBell count={0} />

                    <div className="ml-1 sm:ml-2">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
