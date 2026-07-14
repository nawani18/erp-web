import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardHeader } from "../components/DashboardHeader";
import { StatsGrid } from "../components/StatsGrid";
import { QuickActions } from "../components/QuickActions";
import { RecentActivities } from "../Components/RecentActivities";
import { Announcements } from "../components/Announcements";

/**
 * Main Dashboard Page Component
 * Acts as the container for all dashboard widgets and handles data fetching states.
 */
const Dashboard = () => {
    const { data: response, isLoading, isError, error } = useDashboard();

    // The API returns { success: true, message: '...', data: { ... } }
    const dashboardData = response?.data || {};

    if (isError) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 p-6 text-center">
                <h3 className="text-lg font-semibold text-red-700">
                    Failed to load dashboard data
                </h3>
                <p className="text-sm text-red-600 mt-2">
                    {error?.response?.data?.message ||
                        error?.message ||
                        "An unexpected error occurred. Please try again."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <DashboardHeader />

            <section>
                <QuickActions />
            </section>

            <section>
                <StatsGrid data={dashboardData} loading={isLoading} />
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RecentActivities activities={dashboardData.recentActivities} />
                <Announcements announcements={dashboardData.announcements} />
            </section>
        </div>
    );
};

export default Dashboard;
