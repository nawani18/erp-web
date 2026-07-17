import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../../components/ui/PageHeader";
import SearchInput from "../../../components/ui/SearchInput";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";

import { useDepartments } from "../Hooks/useDepartments";
import { useDeleteDepartment } from "../Hooks/useDepartmentMutations";

import DepartmentTable from "../components/DepartmentTable";
import DeleteDepartmentDialog from "../components/DeleteDepartmentDialog";

const DepartmentList = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [deleteId, setDeleteId] = useState(null);

    const { data, isLoading, error } = useDepartments(search, page, limit);
    console.log(data);

    const { mutate: deleteDepartment, isLoading: isDeleting } =
        useDeleteDepartment();

    // Extract data safely from API response
    const departments = data?.data?.data ?? [];
    const meta = data?.data?.meta;

    const handleEdit = (department) => {
        navigate(`/departments/${department.id}/edit`);
        console.log(department.id);
    };

    const handleDeleteOpen = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirm = () => {
        if (!deleteId) return;

        deleteDepartment(deleteId, {
            onSuccess: () => {
                setDeleteId(null);
            },
        });
    };

    const departmentToDelete = departments.find(
        (department) => department.id === deleteId,
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Departments"
                actions={
                    <Button onClick={() => navigate("/departments/add")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Department
                    </Button>
                }
            />

            <div className="flex justify-between items-center">
                <SearchInput
                    placeholder="Search departments..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {error ? (
                <div className="py-4 text-center text-red-500">
                    Error loading departments.
                </div>
            ) : (
                <DepartmentTable
                    departments={departments}
                    loading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteOpen}
                />
            )}

            {meta && (
                <Pagination
                    currentPage={page}
                    totalPages={meta.totalPages}
                    onPageChange={setPage}
                />
            )}

            <DeleteDepartmentDialog
                open={Boolean(deleteId)}
                department={departmentToDelete}
                loading={isDeleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default DepartmentList;
