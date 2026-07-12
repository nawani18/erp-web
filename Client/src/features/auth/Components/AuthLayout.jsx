import React from "react";

/**
 * AuthLayout.jsx
 * * Reusable layout wrapper for authentication pages (Login, Forgot Password, Reset Password).
 * Provides a modern, responsive split-screen design on large viewports.
 */
const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex bg-slate-50 font-sans">
            {/* Left Section: Branding & Welcome (Hidden on Mobile, Visible on lg+) */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-12 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                </div>

                {/* Header / Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                        {/* Logo Placeholder */}
                        <div className="w-5 h-5 bg-indigo-600 rounded-md"></div>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        College ERP
                    </span>
                </div>

                {/* Hero Copy */}
                <div className="relative z-10 mb-16">
                    <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                        Streamline your <br />
                        campus management.
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
                        The unified platform empowering administrators, faculty,
                        and students with modern academic tools and actionable
                        insights.
                    </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-indigo-200 text-sm font-medium">
                    &copy; {new Date().getFullYear()} College ERP System. All
                    rights reserved.
                </div>
            </div>

            {/* Right Section: Form Container (Full width on Mobile, Half width on lg+) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:bg-slate-50 bg-white">
                {/* Mobile Header (Visible only below lg) */}
                <div className="lg:hidden flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <div className="w-5 h-5 bg-white rounded-md"></div>
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                        College ERP
                    </span>
                </div>

                {/* Render Children (The Form) */}
                <div className="w-full max-w-md bg-white sm:shadow-xl sm:border border-slate-100 rounded-2xl p-6 sm:p-10 transition-all">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
