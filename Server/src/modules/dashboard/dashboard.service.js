import prisma from "../../../prisma/prisma.js";

class DashboardService {
    /**
     * Retrieves summary statistics for the dashboard.
     * Uses Promise.all to fetch data concurrently.
     * Falls back to 0 or empty array if models are not yet initialized/available.
     */
    async getDashboardStats() {
        try {
            const [
                totalStudents,
                totalFaculty,
                totalDepartments,
                totalSubjects,
                recentActivities,
                announcements,
            ] = await Promise.all([
                prisma.student.count().catch(() => 0),
                prisma.faculty.count().catch(() => 0),
                prisma.department.count().catch(() => 0),
                prisma.subject.count().catch(() => 0),
                prisma.activity
                    .findMany({ take: 5, orderBy: { createdAt: "desc" } })
                    .catch(() => []),
                prisma.announcement
                    .findMany({ take: 5, orderBy: { createdAt: "desc" } })
                    .catch(() => []),
            ]);

            return {
                totalStudents,
                totalFaculty,
                totalDepartments,
                totalSubjects,
                recentActivities,
                announcements,
            };
        } catch (error) {
            console.error(
                "Error in DashboardService.getDashboardStats:",
                error,
            );
            // Return default structure to prevent UI breakdown if DB connection issues occur
            return {
                totalStudents: 0,
                totalFaculty: 0,
                totalDepartments: 0,
                totalSubjects: 0,
                recentActivities: [],
                announcements: [],
            };
        }
    }
}

export const dashboardService = new DashboardService();
