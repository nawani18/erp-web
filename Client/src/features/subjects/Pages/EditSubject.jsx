import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import SubjectForm from "../components/SubjectForm";
import { getSubjectById } from "../services/subjectService";
import { useSubjectMutations } from "../hooks/useSubjectMutations";

const EditSubject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: subject,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ["subject", id],
        queryFn: () => getSubjectById(id),
        enabled: !!id,
    });

    const { updateSubject, isUpdating } = useSubjectMutations();

    const onSubmit = (data) => {
        updateSubject(
            { id, data },
            {
                onSuccess: () => {
                    navigate("/subjects");
                },
            },
        );
    };

    if (isFetching) {
        return (
            <div className="text-center py-10">Loading subject details...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                Error loading subject.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Edit Subject" />
            <Card>
                <div className="p-6">
                    <SubjectForm
                        defaultValues={subject?.data || subject}
                        onSubmit={onSubmit}
                        loading={isUpdating}
                    />
                </div>
            </Card>
        </div>
    );
};

export default EditSubject;
