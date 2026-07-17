import React from "react";
import Table from "../../../components/ui/Table.jsx";
import Badge from "../../../components/ui/Badge.jsx";
import IconButton from "../../../components/ui/IconButton.jsx";
import { Edit2, Trash2 } from "lucide-react";

/**
 * SubjectTable Component
 *
 * Renders a data table specifically for Subject entities.
 * Utilizes the shared Table component for consistent styling and layout.
 */
const SubjectTable = ({ subjects = [], onEdit, onDelete, loading = false }) => {
    const columns = [
        {
            header: "Code",
            accessor: "code",
            className: "font-medium text-slate-900 w-24",
        },
        {
            header: "Subject Name",
            accessor: "name",
            className: "font-semibold text-slate-900",
        },
        {
            header: "Department",
            accessor: "department",
            render: (row) => <span>{row.department?.name || "—"}</span>,
        },
        {
            header: "Credits",
            accessor: "credits",
            align: "center",
        },
        {
            header: "Semester",
            accessor: "semester",
            align: "center",
        },
        {
            header: "Status",
            accessor: "isActive",
            align: "center",
            render: (row) => (
                <Badge
                    variant={row.isActive ? "success" : "neutral"}
                    size="small"
                >
                    {row.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "actions",
            align: "right",
            render: (row) => (
                <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                        <IconButton
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                            }}
                            title="Edit Subject"
                            aria-label={`Edit subject ${row.name}`}
                        >
                            <Edit2 className="h-4 w-4 text-slate-500 transition-colors hover:text-indigo-600" />
                        </IconButton>
                    )}

                    {onDelete && (
                        <IconButton
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row.id);
                            }}
                            title="Delete Subject"
                            aria-label={`Delete subject ${row.name}`}
                        >
                            <Trash2 className="h-4 w-4 text-slate-500 transition-colors hover:text-red-600" />
                        </IconButton>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={subjects}
            loading={loading}
            rowKey="id"
            emptyMessage="No subjects found. Click 'Add Subject' to create one."
            className="max-h-[600px]"
        />
    );
};

export default SubjectTable;
