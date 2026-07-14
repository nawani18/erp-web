import React from "react";
import Card from "../../../components/ui/Card";
import { cn } from "../../../lib/utils";

/**
 * Reusable statistics card for the dashboard.
 * Uses the base Card component and supports loading states and trends.
 */
export const StatsCard = ({
    title,
    value,
    icon: Icon,
    color = "blue",
    loading = false,
    trend,
    className,
}) => {
    const colorStyles = {
        blue: "text-blue-600 bg-blue-100",
        green: "text-green-600 bg-green-100",
        purple: "text-purple-600 bg-purple-100",
        orange: "text-orange-600 bg-orange-100",
        red: "text-red-600 bg-red-100",
    };

    const selectedColor = colorStyles[color] || colorStyles.blue;

    return (
        <Card className={cn("flex flex-col justify-between", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>
                    <div className="mt-2">
                        {loading ? (
                            <div className="h-8 w-16 animate-pulse rounded bg-slate-200" />
                        ) : (
                            <h3 className="text-2xl font-bold text-slate-900">
                                {value}
                            </h3>
                        )}
                    </div>
                </div>
                <div className={cn("rounded-lg p-2", selectedColor)}>
                    {Icon && <Icon className="h-6 w-6" />}
                </div>
            </div>

            {trend && !loading && (
                <div className="mt-4">
                    <p className="text-xs text-slate-500">{trend}</p>
                </div>
            )}
        </Card>
    );
};
