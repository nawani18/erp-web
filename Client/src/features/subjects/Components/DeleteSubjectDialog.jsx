import React from "react";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

const DeleteSubjectDialog = ({ subject, loading, onConfirm, onCancel }) => {
    return (
        <ConfirmDialog
            open={!!subject}
            title="Delete Subject"
            message={`Are you sure you want to delete the subject "${subject?.name}"? This action cannot be undone.`}
            onConfirm={() => onConfirm(subject?.id)}
            onCancel={onCancel}
            loading={loading}
        />
    );
};

export default DeleteSubjectDialog;
