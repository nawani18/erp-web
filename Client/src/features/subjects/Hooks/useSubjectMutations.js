import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
    createSubject,
    updateSubject,
    deleteSubject,
} from "../services/subjectService.js";

export const useSubjectMutations = () => {
    const queryClient = useQueryClient();

    const invalidateSubjects = () => {
        queryClient.invalidateQueries({ queryKey: ["subjects"] });
    };

    const createMutation = useMutation({
        mutationFn: createSubject,
        onSuccess: () => {
            invalidateSubjects();
            toast.success("Subject created successfully.");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateSubject(id, data),
        onSuccess: () => {
            invalidateSubjects();
            toast.success("Subject updated successfully.");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteSubject,
        onSuccess: () => {
            invalidateSubjects();
            toast.success("Subject deleted successfully.");
        },
    });

    return {
        createSubject: createMutation.mutate,
        isCreating: createMutation.isPending,
        updateSubject: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        deleteSubject: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
};
