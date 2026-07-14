import { Router } from "express";
import { router as authRoutes } from "../modules/auth/index.js";
import dashBoardRoutes  from "../modules/dashboard/dashboard.routes.js";

/**
 * src/routes/index.js
 * Central router for the College ERP API.
 * Mounts individual module routers here to keep the app.js clean.
 */

const router = Router();

// Authentication Routes
router.use("/auth", authRoutes);
router.use("/dashboard", dashBoardRoutes);

// Placeholder for future modules (Scalability)
// router.use('/students', studentRoutes);
// router.use('/faculty', facultyRoutes);
// router.use('/departments', departmentRoutes);
// router.use('/subjects', subjectRoutes);
// router.use('/attendance', attendanceRoutes);
// router.use('/results', resultRoutes);

export default router;
