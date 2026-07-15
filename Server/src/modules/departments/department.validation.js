import { z } from "zod";

export const createDepartmentSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be at most 100 characters long"),
    code: z
        .string()
        .min(2, "Code must be at least 2 characters long")
        .max(10, "Code must be at most 10 characters long")
        .regex(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric only"),
    description: z
        .string()
        .max(500, "Description must be at most 500 characters long")
        .optional(),
    isActive: z.boolean().optional(),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();
