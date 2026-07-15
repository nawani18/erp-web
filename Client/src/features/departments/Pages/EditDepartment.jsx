import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentService from "../services/departmentService";
import { useUpdateDepartment } from "../hooks/useDepartmentMutations";

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    const {
        data: department,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ["department", id],
        queryFn: () => DepartmentService.getDepartmentById(id),
    });

    console.log("Department:", department);

    const { mutate: updateDepartment, isLoading: isUpdating } =
        useUpdateDepartment();

    const onSubmit = (data) => {
        updateDepartment(
            { id, data },
            {
                onSuccess: () => {
                    navigate("/departments");
                },
            },
        );
    };

    if (isFetching) {
        return (
            <div className="text-center py-10">
                Loading department details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                Error loading department.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Edit Department" />
            <Card>
                <div className="p-6">
                    <DepartmentForm
                        defaultValues={department.data}
                        onSubmit={onSubmit}
                        loading={isUpdating}
                    />
                </div>
            </Card>
        </div>
    );
};

export default EditDepartment;
