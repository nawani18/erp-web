import React from "react";
import Card from "../../../components/ui/Card";

/**
 * AuthCard.jsx
 * Reusable authentication card used across Login, Forgot Password, and Reset Password pages.
 * Enforces consistent spacing, typography, and responsive layout for auth forms.
 */
const AuthCard = ({ title, subtitle, children, footer }) => {
    return (
        <Card
            // Remove borders and shadows on mobile to blend with AuthLayout, keep them on sm+
            className="w-full max-w-md mx-auto border-0 shadow-none bg-transparent sm:bg-white sm:border sm:border-slate-200 sm:shadow-xl sm:p-4 transition-all"
            title={
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        {title}
                    </h2>
                </div>
            }
            subtitle={
                subtitle ? (
                    <div className="text-center mt-2">
                        <p className="text-sm text-slate-500">{subtitle}</p>
                    </div>
                ) : null
            }
            footer={
                footer ? (
                    <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm font-medium text-slate-600">
                        {footer}
                    </div>
                ) : null
            }
        >
            {/* Form Content Wrapper */}
            <div className="mt-8 flex flex-col gap-5">{children}</div>
        </Card>
    );
};

export default AuthCard;
