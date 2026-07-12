import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout, AuthCard } from "../components";
import FormField from "../../../components/ui/FormField";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

/**
 * ForgotPassword.jsx
 * Page for users to request a password reset email.
 */
const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log("Password reset requested for:", data.email);
    };

    return (
        <AuthLayout>
            <AuthCard
                title={isSubmitted ? "Check your email" : "Forgot password?"}
                subtitle={
                    isSubmitted
                        ? "We've sent a password reset link to your email address."
                        : "Enter your email address and we'll send you instructions to reset your password."
                }
                footer={
                    !isSubmitted && (
                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-500 transition-colors"
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
                            label="Email Address"
                            error={errors.email?.message}
                        >
                            <Input
                                type="email"
                                placeholder="name@college.edu"
                                {...register("email")}
                            />
                        </FormField>

                        <Button
                            type="submit"
                            className="w-full justify-center"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Send reset link
                        </Button>
                    </form>
                ) : (
                    <div className="text-center">
                        <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => setIsSubmitted(false)}
                        >
                            Back to login
                        </Button>
                    </div>
                )}
            </AuthCard>
        </AuthLayout>
    );
};

export default ForgotPassword;
