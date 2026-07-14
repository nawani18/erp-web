import React from "react";
import Card from "../../../components/ui/Card";

/**
 * Announcements Component
 * Displays system-wide announcements or notices.
 * @param {Array} announcements - Array of announcement objects { title: string, message: string, date: string }
 */
export const Announcements = ({ announcements = [] }) => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Announcements
                </h3>
            </div>

            {announcements.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-slate-500 italic">
                        No new announcements at this time.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                        <div
                            key={index}
                            className="border-l-4 border-indigo-500 bg-indigo-50/50 p-4 rounded-r-lg"
                        >
                            <h4 className="text-sm font-bold text-slate-900">
                                {announcement.title}
                            </h4>
                            <p className="text-sm text-slate-600 mt-1">
                                {announcement.message}
                            </p>
                            {announcement.date && (
                                <p className="text-xs text-slate-400 mt-2">
                                    {announcement.date}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
