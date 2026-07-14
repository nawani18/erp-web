import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { sidebarConfig } from "../../config/sidebar";
import useAuthStore from "../../store/useAuthStore";
import { cn } from "../../lib/utils"; // Assuming cn utility is available, fallback to standard template literals if not

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const location = useLocation();

    // Fetch role from global store, default to ADMIN for safety
    const role = useAuthStore((state) => state.role) || "ADMIN";
    const navItems = sidebarConfig[role] || sidebarConfig.ADMIN;

    // Auto-expand parent menus if a child route is active on mount
    useEffect(() => {
        navItems.forEach((item) => {
            if (item.children && location.pathname.startsWith(item.path)) {
                setExpandedMenus((prev) => ({ ...prev, [item.id]: true }));
            }
        });
    }, [location.pathname, navItems]);

    const toggleSubMenu = (id, e) => {
        e.preventDefault();
        setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
        // If sidebar is collapsed, expanding a submenu should automatically uncollapse it
        if (isCollapsed) setIsCollapsed(false);
    };

    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Circle;
        return (
            <IconComponent className="w-5 h-5 flex-shrink-0 transition-colors" />
        );
    };

    return (
        <>
            {/* Mobile Drawer Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
                    onClick={onCloseMobile}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out md:relative md:translate-x-0",
                    isCollapsed ? "w-20" : "w-64",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                {/* Sidebar Header & Collapse Toggle */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
                    <div
                        className={cn(
                            "flex items-center gap-2 overflow-hidden transition-all duration-300",
                            isCollapsed
                                ? "w-0 opacity-0"
                                : "w-auto opacity-100",
                        )}
                    >
                        <Icons.GraduationCap className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <span className="text-lg font-bold text-slate-800 whitespace-nowrap">
                            College ERP
                        </span>
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={cn(
                            "hidden md:flex p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500",
                            isCollapsed && "mx-auto",
                        )}
                        aria-label="Toggle Sidebar"
                    >
                        {isCollapsed ? (
                            <Icons.ChevronRight className="w-5 h-5" />
                        ) : (
                            <Icons.ChevronLeft className="w-5 h-5" />
                        )}
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onCloseMobile}
                        className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
                    >
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const hasChildren =
                                item.children && item.children.length > 0;
                            const isActive =
                                location.pathname === item.path ||
                                location.pathname.startsWith(`${item.path}/`);
                            const isExpanded = expandedMenus[item.id];

                            return (
                                <li key={item.id} className="flex flex-col">
                                    {hasChildren ? (
                                        // Parent Menu Button (Toggle Submenu)
                                        <button
                                            onClick={(e) =>
                                                toggleSubMenu(item.id, e)
                                            }
                                            className={cn(
                                                "flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 group w-full focus:outline-none",
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-700 font-medium"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                                isCollapsed
                                                    ? "justify-center"
                                                    : "justify-start",
                                            )}
                                            title={
                                                isCollapsed
                                                    ? item.title
                                                    : undefined
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                {renderIcon(item.icon)}
                                                <span
                                                    className={cn(
                                                        "whitespace-nowrap transition-all duration-300",
                                                        isCollapsed
                                                            ? "w-0 opacity-0 hidden"
                                                            : "w-auto opacity-100 block",
                                                    )}
                                                >
                                                    {item.title}
                                                </span>
                                            </div>

                                            {!isCollapsed && (
                                                <Icons.ChevronDown
                                                    className={cn(
                                                        "w-4 h-4 transition-transform duration-200",
                                                        isExpanded
                                                            ? "rotate-180"
                                                            : "",
                                                    )}
                                                />
                                            )}
                                        </button>
                                    ) : (
                                        // Standard Menu Link
                                        <NavLink
                                            to={item.path}
                                            onClick={() =>
                                                window.innerWidth < 768 &&
                                                onCloseMobile?.()
                                            }
                                            className={({ isActive }) =>
                                                cn(
                                                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group focus:outline-none",
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                                    isCollapsed
                                                        ? "justify-center"
                                                        : "justify-start",
                                                )
                                            }
                                            title={
                                                isCollapsed
                                                    ? item.title
                                                    : undefined
                                            }
                                        >
                                            {renderIcon(item.icon)}
                                            <span
                                                className={cn(
                                                    "whitespace-nowrap transition-all duration-300",
                                                    isCollapsed
                                                        ? "w-0 opacity-0 hidden"
                                                        : "w-auto opacity-100 block",
                                                )}
                                            >
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    )}

                                    {/* Submenu Drawer */}
                                    {hasChildren && (
                                        <div
                                            className={cn(
                                                "grid transition-all duration-300 ease-in-out overflow-hidden",
                                                isExpanded && !isCollapsed
                                                    ? "grid-rows-[1fr] opacity-100 mt-1"
                                                    : "grid-rows-[0fr] opacity-0",
                                            )}
                                        >
                                            <ul className="min-h-0 flex flex-col space-y-1 relative pl-10 pr-2">
                                                {/* Submenu connecting line */}
                                                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200"></div>

                                                {item.children.map((child) => (
                                                    <li key={child.id}>
                                                        <NavLink
                                                            to={child.path}
                                                            onClick={() =>
                                                                window.innerWidth <
                                                                    768 &&
                                                                onCloseMobile?.()
                                                            }
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                cn(
                                                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm focus:outline-none",
                                                                    isActive
                                                                        ? "text-indigo-600 font-medium bg-indigo-50/50"
                                                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                className={cn(
                                                                    "w-1 h-1 rounded-full bg-current opacity-50",
                                                                    isActive &&
                                                                        "opacity-100 scale-125",
                                                                )}
                                                            />
                                                            <span className="truncate">
                                                                {child.title}
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
