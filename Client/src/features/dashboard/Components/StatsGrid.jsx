import React from "react";
import { StatsCard } from "./StatsCard";
import { Users, UserCheck, Building, BookOpen } from "lucide-react";

/**
 * Grid layout component to display dashboard statistics.
 * @param {Object} props.data - The dashboard statistics object.
 * @param {boolean} props.loading - Loading state from the query hook.
 */
export const StatsGrid = ({ data, loading }) => {
    const stats = [
        {
            title: "Total Students",
            value: data?.totalStudents,
            icon: Users,
            color: "blue",
        },
        {
            title: "Total Faculty",
            value: data?.totalFaculty,
            icon: UserCheck,
            color: "green",
        },
        {
            title: "Total Departments",
            value: data?.totalDepartments,
            icon: Building,
            color: "purple",
        },
        {
            title: "Total Subjects",
            value: data?.totalSubjects,
            icon: BookOpen,
            color: "orange",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    loading={loading}
                />
            ))}
        </div>
    );
};
