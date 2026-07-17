import prisma from "../../../prisma/prisma.js";
import { ERROR_MESSAGES } from "./subject.constants.js";

class SubjectService {
    async createSubject(data) {
        const { name, code, departmentId } = data;

        const department = await prisma.department.findUnique({
            where: { id: departmentId },
        });

        if (!department) {
            throw new Error(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND);
        }

        const existing = await prisma.subject.findFirst({
            where: {
                OR: [
                    { code },
                    {
                        AND: [{ name }, { departmentId }],
                    },
                ],
            },
        });

        if (existing) {
            throw new Error(ERROR_MESSAGES.SUBJECT_ALREADY_EXISTS);
        }

        return await prisma.subject.create({ data });
    }

    async getSubjects(page = 1, limit = 10, search = "", departmentId = null) {
        const skip = (page - 1) * limit;

        const where = {
            isActive: true,
            ...(departmentId && { departmentId: Number(departmentId) }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { code: { contains: search, mode: "insensitive" } },
                ],
            }),
        };

        const [data, total] = await Promise.all([
            prisma.subject.findMany({
                where,
                skip,
                take: limit,
                include: {
                    department: {
                        select: {
                            id: true,
                            name: true,
                            code: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.subject.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getSubjectById(id) {
        const subject = await prisma.subject.findUnique({
            where: { id: Number(id) },
            include: {
                department: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                    },
                },
            },
        });

        if (!subject) {
            throw new Error(ERROR_MESSAGES.SUBJECT_NOT_FOUND);
        }

        return subject;
    }

    async updateSubject(id, data) {
        // Ensure subject exists
        const subject = await this.getSubjectById(id);

        // Validate department if updating departmentId
        if (data.departmentId) {
            const department = await prisma.department.findUnique({
                where: { id: data.departmentId },
            });

            if (!department) {
                throw new Error(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND);
            }
        }

        // Prevent duplicate code or name within department
        if (data.name || data.code || data.departmentId) {
            const departmentId = data.departmentId || subject.departmentId;

            const existing = await prisma.subject.findFirst({
                where: {
                    id: { not: Number(id) },
                    OR: [
                        data.code ? { code: data.code } : {},
                        data.name
                            ? {
                                  AND: [{ name: data.name }, { departmentId }],
                              }
                            : {},
                    ],
                },
            });

            if (existing) {
                throw new Error(ERROR_MESSAGES.SUBJECT_ALREADY_EXISTS);
            }
        }

        return await prisma.subject.update({
            where: { id: Number(id) },
            data,
        });
    }

    async deleteSubject(id) {
        // Ensure subject exists before soft deleting
        await this.getSubjectById(id);

        return await prisma.subject.update({
            where: { id: Number(id) },
            data: {
                isActive: false,
            },
        });
    }
}

export default new SubjectService();
