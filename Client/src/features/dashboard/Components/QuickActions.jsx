import React from "react";
import Button from "../../../components/ui/Button";
import {
    UserPlus,
    UserCheck,
    Building,
    CalendarCheck,
    BarChart3,
} from "lucide-react";

/**
 * QuickActions Component
 * Displays shortcut buttons for common dashboard operations.
 */
export const QuickActions = () => {
    const actions = [
        { label: "Add Student", icon: UserPlus, variant: "primary" },
        { label: "Add Faculty", icon: UserCheck, variant: "primary" },
        { label: "Add Department", icon: Building, variant: "secondary" },
        { label: "Mark Attendance", icon: CalendarCheck, variant: "outline" },
        { label: "View Results", icon: BarChart3, variant: "outline" },
    ];

    return (
        <div className="flex flex-wrap gap-4">
            {actions.map((action) => (
                <Button
                    key={action.label}
                    variant={action.variant}
                    size="md"
                    className="flex items-center"
                >
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                </Button>
            ))}
        </div>
    );
};
