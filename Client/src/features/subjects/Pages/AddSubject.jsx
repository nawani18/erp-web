import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import SubjectForm from "../components/SubjectForm";
import { useSubjectMutations } from "../hooks/useSubjectMutations";

const AddSubject = () => {
    const navigate = useNavigate();
    const { createSubject, isCreating } = useSubjectMutations();

    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Subjects", href: "/subjects" },
        { label: "Add Subject" },
    ];

    const handleSubmit = (data) => {
        createSubject(data, {
            onSuccess: () => navigate("/subjects"),
        });
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Add Subject" breadcrumbs={breadcrumbs} />
            <Card className="p-6">
                <SubjectForm onSubmit={handleSubmit} loading={isCreating} />
            </Card>
        </div>
    );
};

export default AddSubject;
