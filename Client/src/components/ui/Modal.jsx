import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Reusable Modal component for dialogs, forms, and alerts.
 * Features strict accessibility controls including focus trapping and ESC-to-close.
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    footer,
    children,
    className,
    ...props
}) => {
    const modalRef = useRef(null);

    // Handle ESC close, focus trapping, and background scroll locking
    useEffect(() => {
        if (!isOpen) return;

        // Lock background scroll when modal is open
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            // 1. ESC to close
            if (e.key === "Escape") {
                onClose();
                return;
            }

            // 2. Focus Trap logic
            if (e.key === "Tab") {
                // Find all focusable elements inside the modal
                const focusableElements = modalRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );

                if (!focusableElements || focusableElements.length === 0)
                    return;

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                // Shift + Tab
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                }
                // Standard Tab
                else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Initial focus on the modal container to trigger the trap smoothly
        if (modalRef.current) {
            modalRef.current.focus();
        }

        // Cleanup phase when modal unmounts or closes
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen, onClose]);

    // Do not render anything if the modal is closed
    if (!isOpen) return null;

    // Render the modal into the document body to prevent z-index/overflow clipping from parent components
    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
        >
            {/* Backdrop: Clicking this triggers onClose */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            />

            {/* Modal Content Panel */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className={cn(
                    "relative w-full max-w-lg rounded-2xl bg-white shadow-xl outline-none",
                    "flex flex-col max-h-[90vh]",
                    className,
                )}
                // Prevent click events inside the modal from bubbling up to the backdrop
                onClick={(e) => e.stopPropagation()}
                {...props}
            >
                {/* Header Section */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex flex-col space-y-1 pr-6">
                        {title && (
                            <h2
                                id="modal-title"
                                className="text-lg font-semibold text-slate-900 leading-none"
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p
                                id="modal-description"
                                className="text-sm text-slate-500"
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                {/* Scrollable Body Section */}
                <div className="px-6 py-4 overflow-y-auto">{children}</div>

                {/* Optional Footer Section (e.g., Action buttons) */}
                {footer && (
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 rounded-b-2xl shrink-0 flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};

Modal.displayName = "Modal";

export default Modal;
