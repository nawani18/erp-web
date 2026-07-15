import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "../../../components/ui/FormField";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Button from "../../../components/ui/Button";

const departmentSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be at most 100 characters"),
    code: z
        .string()
        .min(2, "Code must be at least 2 characters")
        .max(10, "Code must be at most 10 characters")
        .regex(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric only"),
    description: z
        .string()
        .max(500, "Description must be at most 500 characters")
        .optional()
        .or(z.literal("")),
    isActive: z.boolean().default(true),
});

const DepartmentForm = ({ defaultValues, onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(departmentSchema),
        defaultValues: defaultValues || {
            name: "",
            code: "",
            description: "",
            isActive: true,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Department Name"
                    error={errors.name?.message}
                    htmlFor="name"
                >
                    <Input
                        id="name"
                        {...register("name")}
                        placeholder="e.g. Computer Science"
                        disabled={loading}
                    />
                </FormField>

                <FormField
                    label="Department Code"
                    error={errors.code?.message}
                    htmlFor="code"
                >
                    <Input
                        id="code"
                        {...register("code")}
                        placeholder="e.g. CS101"
                        disabled={loading}
                        className="uppercase"
                    />
                </FormField>
            </div>

            <FormField
                label="Description"
                error={errors.description?.message}
                htmlFor="description"
            >
                <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Brief department description..."
                    disabled={loading}
                    rows={4}
                />
            </FormField>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="isActive"
                    {...register("isActive")}
                    disabled={loading}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700"
                >
                    Is Active
                </label>
            </div>

            <div className="flex justify-end space-x-4">
                <Button type="submit" loading={loading} disabled={loading}>
                    {defaultValues ? "Update Department" : "Create Department"}
                </Button>
            </div>
        </form>
    );
};

export default DepartmentForm;
