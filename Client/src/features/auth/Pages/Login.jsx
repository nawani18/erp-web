import React from "react";
import { AuthLayout, AuthCard } from "../components";
import LoginForm from "../components/LoginForm";

/**
 * Login.jsx
 * Login page wrapper utilizing AuthLayout, AuthCard, and LoginForm.
 */
const Login = () => {
    // Placeholder login handler
    const handleLogin = (data) => {
        console.log("Login attempt received:", data);
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Welcome back"
                subtitle="Please enter your details to access your account."
            >
                <LoginForm onSubmit={handleLogin} />
            </AuthCard>
        </AuthLayout>
    );
};

export default Login;
