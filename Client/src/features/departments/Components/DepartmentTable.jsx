import React from "react";
import Table from "../../../components/ui/Table.jsx";
import Badge from "../../../components/ui/Badge.jsx";
import IconButton from "../../../components/ui/IconButton.jsx";
import { Edit2, Trash2 } from "lucide-react";

/**
 * DepartmentTable Component
 *
 * Renders a data table specifically for Department entities.
 * Utilizes the shared Table component for consistent styling and layout.
 */
const DepartmentTable = ({
    departments = [],
    onEdit,
    onDelete,
    loading = false,
}) => {
    const columns = [
        {
            header: "Code",
            accessor: "code",
            className: "font-medium text-slate-900 w-24",
        },
        {
            header: "Department Name",
            accessor: "name",
            className: "font-semibold text-slate-900",
        },
        {
            header: "Description",
            accessor: "description",
            render: (row) => (
                <span className="block max-w-xs truncate text-slate-500 md:max-w-md">
                    {row.description || "—"}
                </span>
            ),
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
                            title="Edit Department"
                            aria-label={`Edit department ${row.name}`}
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
                                console.log("Sending:", row.id);
                                onDelete(row.id);
                            }}
                            title="Delete Department"
                            aria-label={`Delete department ${row.name}`}
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
            data={departments}
            loading={loading}
            rowKey="id"
            emptyMessage="No departments found. Click 'Add Department' to create one."
            className="max-h-[600px]"
        />
    );
};

export default DepartmentTable;
