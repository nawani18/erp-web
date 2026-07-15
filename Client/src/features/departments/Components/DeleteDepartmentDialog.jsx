import React from "react";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

const DeleteDepartmentDialog = ({
    open,
    department,
    loading,
    onConfirm,
    onCancel,
}) => {
    return (
        <ConfirmDialog
            isOpen={open}
            onClose={onCancel}
            onConfirm={onConfirm}
            title="Delete Department"
            description={`Are you sure you want to delete the department "${department?.name}"? This action cannot be undone.`}
            isLoading={loading}
            isDanger={true}
            confirmText="Delete"
            cancelText="Cancel"
        />
    );
};

export default DeleteDepartmentDialog;
