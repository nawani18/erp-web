import { Router } from "express";
import departmentController from "./department.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";

const router = Router();

// Protect all routes with authentication and admin authorization
router.use(authenticate, authorize("ADMIN"));

router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.patch("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

export default router;
