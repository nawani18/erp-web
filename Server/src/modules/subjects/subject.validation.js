import { z } from "zod";

export const createSubjectSchema = z.object({
    name: z.string().min(2).max(100),
    code: z
        .string()
        .min(2)
        .max(10)
        .regex(
            /^[A-Z0-9]+$/,
            "Code must contain only uppercase letters and numbers",
        ),
    description: z.string().max(500).optional(),
    credits: z.coerce.number().int().min(1).max(10).default(4),
    semester: z.coerce.number().int().min(1).max(8),
    departmentId: z.coerce.number().int().positive(),
    isActive: z.boolean().default(true).optional(),
});

export const updateSubjectSchema = createSubjectSchema.partial();
