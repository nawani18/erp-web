import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import  useAuthStore  from "../../../store/useAuthStore";

/**
 * DashboardHeader Component
 * Displays a welcome message, the current date, and a brief overview.
 */
export const DashboardHeader = () => {
    const { user } = useAuthStore();

    const formattedDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <PageHeader
            title={`Welcome back, ${user?.name || "Admin"}`}
            description={`Here is your College ERP overview for ${formattedDate}`}
            className="mb-6"
        />
    );
};
