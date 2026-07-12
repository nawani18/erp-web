import React from "react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * Reusable ConfirmDialog component built on top of the Modal component.
 * Ideal for delete confirmations, unsaved changes warnings, and critical actions.
 */
const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
    isDanger = false,
    children,
}) => {
    // Construct the footer with our reusable Button components
    const dialogFooter = (
        <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
                {cancelText}
            </Button>

            <Button
                variant={isDanger ? "danger" : "primary"}
                onClick={onConfirm}
                loading={isLoading}
            >
                {confirmText}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            // Prevent closing the modal if an async action is currently processing
            onClose={isLoading ? () => {} : onClose}
            title={title}
            description={description}
            footer={dialogFooter}
        >
            {/* Optionally render custom children if a simple description string isn't enough */}
            {children}
        </Modal>
    );
};

ConfirmDialog.displayName = "ConfirmDialog";

export default ConfirmDialog;
