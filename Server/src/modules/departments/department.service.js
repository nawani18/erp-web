import prisma from "../../../prisma/prisma.js";

class DepartmentService {
    async createDepartment(data) {
        const { name, code } = data;
        const existing = await prisma.department.findFirst({
            where: {
                OR: [{ name }, { code }],
            },
        });

        if (existing) {
            throw new Error(
                "Department with this name or code already exists.",
            );
        }

        return await prisma.department.create({ data });
    }

    async getDepartments(page = 1, limit = 10, search = "") {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                  OR: [
                      { name: { contains: search, mode: "insensitive" } },
                      { code: { contains: search, mode: "insensitive" } },
                  ],
              }
            : {};

        const [data, total] = await Promise.all([
            prisma.department.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.department.count({ where }),
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

    async getDepartmentById(id) {
        const department = await prisma.department.findUnique({
            where: { id: parseInt(id) },
        });

        if (!department) {
            throw new Error("Department not found.");
        }

        return department;
    }

    async updateDepartment(id, data) {
        // Ensure department exists
        await this.getDepartmentById(id);

        // Prevent duplicate name or code if they are being updated
        if (data.name || data.code) {
            const existing = await prisma.department.findFirst({
                where: {
                    AND: [
                        { OR: [{ name: data.name }, { code: data.code }] },
                        { id: { not: parseInt(id) } },
                    ],
                },
            });

            if (existing) {
                throw new Error(
                    "Another department with this name or code already exists.",
                );
            }
        }

        return await prisma.department.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async deleteDepartment(id) {
        // Ensure department exists before soft deleting
        await this.getDepartmentById(id);

        return await prisma.department.update({
            where: { id: parseInt(id) },
            data: { isActive: false },
        });
    }
}

export default new DepartmentService();
