import React from "react";
import Card from "../../../components/ui/Card";

/**
 * RecentActivities Component
 * Displays a list of recent system activities or events.
 * * @param {Array} activities - Array of activity objects { title: string, timestamp: string }
 */
export const RecentActivities = ({ activities = [] }) => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Recent Activities
                </h3>
            </div>

            {activities.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-slate-500 italic">
                        No recent activities available.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-slate-900">
                                    {activity.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {activity.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
