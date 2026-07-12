import { Link } from "react-router-dom";
import { ChevronRight, MoreHorizontal } from "lucide-react";

const Breadcrumb = ({ items = [], className = "" }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-sm text-slate-500">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isFirst = index === 0;
                    const Icon = item.icon;

                    // Responsive logic: hide middle breadcrumb items on mobile screens
                    const isMiddle = !isFirst && !isLast;

                    return (
                        <li
                            key={index}
                            className={`items-center gap-1.5 sm:gap-2 ${isMiddle ? "hidden sm:flex" : "flex"}`}
                        >
                            {/* Mobile collapse ellipsis (rendered right before the last item on mobile) */}
                            {isLast && items.length > 2 && (
                                <div
                                    className="flex sm:hidden items-center gap-1.5 mr-1.5"
                                    aria-hidden="true"
                                >
                                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                            )}

                            {/* Standard chevron separator */}
                            {index > 0 && (
                                <ChevronRight
                                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ${
                                        isLast && items.length > 2
                                            ? "hidden sm:block"
                                            : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            )}

                            {/* Breadcrumb Item */}
                            {isLast ? (
                                <span
                                    className="flex items-center gap-1.5 font-medium text-slate-800"
                                    aria-current="page"
                                >
                                    {Icon && (
                                        <Icon
                                            className="w-4 h-4 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="truncate max-w-[150px] sm:max-w-xs">
                                        {item.label}
                                    </span>
                                </span>
                            ) : (
                                <Link
                                    to={item.href || "#"}
                                    className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-sm"
                                >
                                    {Icon && (
                                        <Icon
                                            className="w-4 h-4 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="truncate max-w-[150px] sm:max-w-xs">
                                        {item.label}
                                    </span>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
