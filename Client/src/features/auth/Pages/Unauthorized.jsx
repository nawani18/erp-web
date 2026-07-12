import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

/**
 * Unauthorized.jsx
 * Displayed when a user attempts to access a route without the required permissions.
 */
const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <Card className="w-full max-w-md text-center p-8">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-full">
                        <ShieldAlert size={48} strokeWidth={1.5} />
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Access Denied
                    </h1>
                    <p className="text-slate-500">
                        You do not have permission to access this page.
                    </p>
                </div>

                <Button
                    variant="primary"
                    onClick={() => navigate("/dashboard")}
                    className="w-full justify-center"
                >
                    Back to Dashboard
                </Button>
            </Card>
        </div>
    );
};

export default Unauthorized;
