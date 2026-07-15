import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import DepartmentForm from "../components/DepartmentForm";
import { useCreateDepartment } from "../hooks/useDepartmentMutations";

const AddDepartment = () => {
    const navigate = useNavigate();
    const { mutate: createDepartment, isLoading } = useCreateDepartment();

    const onSubmit = (data) => {
        createDepartment(data, {
            onSuccess: () => {
                navigate("/departments");
            },
        });
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Add Department" />
            <Card>
                <div className="p-6">
                    <DepartmentForm onSubmit={onSubmit} loading={isLoading} />
                </div>
            </Card>
        </div>
    );
};

export default AddDepartment;
