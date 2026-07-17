import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../../components/ui/PageHeader";
import SearchInput from "../../../components/ui/SearchInput";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";
import Select from "../../../components/ui/Select";

import { useSubjects } from "../Hooks/useSubject";
import { useSubjectMutations } from "../Hooks/useSubjectMutations";
import { useDepartmentAll } from "../../departments/Hooks/useDepartmentAll.js";

import SubjectTable from "../components/SubjectTable";
import DeleteSubjectDialog from "../components/DeleteSubjectDialog";

const SubjectList = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [departmentId, setDepartmentId] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const { data, isLoading, error } = useSubjects(
        search,
        page,
        limit,
        departmentId || null,
    );

    const { data: deptData } = useDepartmentAll();
    const { deleteSubject, isDeleting } = useSubjectMutations();

    // Extract API data safely
    const subjects = data?.data?.data ?? [];
    const meta = data?.data?.meta;

    const departments = deptData?.data?.data ?? [];

    const handleEdit = (subject) => {
        navigate(`/subjects/${subject.id}/edit`);
    };

    const handleDeleteOpen = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirm = () => {
        if (!deleteId) return;

        deleteSubject(deleteId, {
            onSuccess: () => {
                setDeleteId(null);
            },
        });
    };

    const subjectToDelete = subjects.find((subject) => subject.id === deleteId);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Subjects"
                actions={
                    <Button onClick={() => navigate("/subjects/add")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Subject
                    </Button>
                }
            />

            <div className="flex flex-col md:flex-row justify-between gap-4">
                <SearchInput
                    placeholder="Search subjects..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <div className="w-full md:w-64">
                    <Select
                        value={departmentId}
                        onChange={(e) => {
                            setDepartmentId(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All Departments</option>

                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {error ? (
                <div className="py-4 text-center text-red-500">
                    Error loading subjects.
                </div>
            ) : (
                <SubjectTable
                    subjects={subjects}
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

            <DeleteSubjectDialog
                open={Boolean(deleteId)}
                subject={subjectToDelete}
                loading={isDeleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default SubjectList;
