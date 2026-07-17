import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";
import Card from "../../../components/ui/Card";
import { useDepartmentAll } from "../../departments/Hooks/useDepartmentAll.js";
import { data } from "react-router-dom";

// Local schema definition to avoid cross-module backend dependency
const subjectSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    code: z
        .string()
        .min(2)
        .max(10)
        .regex(
            /^[A-Z0-9]+$/,
            "Code must contain only uppercase letters and numbers",
        ),
    description: z.string().max(500).optional().or(z.literal("")),
    credits: z.coerce.number().int().min(1).max(10),
    semester: z.coerce.number().int().min(1).max(8),
    departmentId: z.coerce
        .number()
        .int()
        .positive("Please select a department"),
    isActive: z.boolean().default(true),
});

const SubjectForm = ({ defaultValues, onSubmit, loading }) => {
    const qureyy = useDepartmentAll();
    const { data: deptData } = useDepartmentAll();
    const departments = deptData?.data?.data ?? [];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(subjectSchema),
        defaultValues: defaultValues || {
            name: "",
            code: "",
            description: "",
            credits: 4,
            semester: 1,
            departmentId: "",
            isActive: true,
        },
    });

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Subject Name"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Subject Code"
                        {...register("code")}
                        error={errors.code?.message}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Credits"
                        type="number"
                        {...register("credits", { valueAsNumber: true })}
                        error={errors.credits?.message}
                    />
                    <Input
                        label="Semester"
                        type="number"
                        {...register("semester", { valueAsNumber: true })}
                        error={errors.semester?.message}
                    />
                </div>

                <Controller
                    name="departmentId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Department"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                                field.onChange(
                                    e.target.value === ""
                                        ? ""
                                        : Number(e.target.value),
                                )
                            }
                            error={errors.departmentId?.message}
                        >
                            <option value="">Select a department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </Select>
                    )}
                />

                <Textarea
                    label="Description"
                    {...register("description")}
                    error={errors.description?.message}
                    rows={4}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" loading={loading} disabled={loading}>
                        {defaultValues ? "Update Subject" : "Create Subject"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default SubjectForm;
