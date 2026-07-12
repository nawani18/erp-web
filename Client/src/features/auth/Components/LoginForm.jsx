import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import FormField from "../../../components/ui/FormField";
import Input from "../../../components/ui/Input";
import PasswordField from "./PasswordField";
import Button from "../../../components/ui/Button";

// Validation schema
const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

/**
 * LoginForm.jsx
 * Production-ready login form integrated with backend API.
 */
const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            await login({
                email: data.email,
                password: data.password,
            });

            toast.success("Logged in successfully");
            navigate("/dashboard");
        } catch (error) {
            // Extract backend error message if available
            const message =
                error.response?.data?.message ||
                "Login failed. Please check your credentials.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <FormField label="Email Address" error={errors.email?.message}>
                <Input
                    type="email"
                    placeholder="name@college.edu"
                    {...register("email")}
                />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
                <PasswordField
                    placeholder="Enter your password"
                    {...register("password")}
                />
            </FormField>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        {...register("rememberMe")}
                    />
                    <span className="text-sm text-slate-600">Remember me</span>
                </label>

                <button
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot password?
                </button>
            </div>

            <Button
                type="submit"
                className="w-full justify-center"
                loading={isSubmitting}
                disabled={isSubmitting}
            >
                Sign in
            </Button>
        </form>
    );
};

export default LoginForm;
