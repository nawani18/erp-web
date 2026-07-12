import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout, AuthCard, PasswordField } from "../components";
import Button from "../../../components/ui/Button";
import FormField from "../../../components/ui/FormField";

// Validation schema for password reset
const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

/**
 * ResetPassword.jsx
 * Page for users to set a new password after a reset request.
 */
const ResetPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log("Password successfully reset.");
    };

    return (
        <AuthLayout>
            <AuthCard
                title={isSubmitted ? "Password reset" : "Set new password"}
                subtitle={
                    isSubmitted
                        ? "Your password has been successfully updated. You can now login with your new credentials."
                        : "Please enter your new password below."
                }
                footer={
                    isSubmitted && (
                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-500 transition-colors"
                            onClick={() => setIsSubmitted(false)}
                        >
                            Back to login
                        </button>
                    )
                }
            >
                {!isSubmitted ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            label="New Password"
                            error={errors.password?.message}
                        >
                            <PasswordField
                                placeholder="••••••••"
                                {...register("password")}
                            />
                        </FormField>

                        <FormField
                            label="Confirm Password"
                            error={errors.confirmPassword?.message}
                        >
                            <PasswordField
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                            />
                        </FormField>

                        <Button
                            type="submit"
                            className="w-full justify-center"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Reset password
                        </Button>
                    </form>
                ) : (
                    <div className="text-center pt-2">
                        <Button
                            className="w-full justify-center"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Proceed to Login
                        </Button>
                    </div>
                )}
            </AuthCard>
        </AuthLayout>
    );
};

export default ResetPassword;
