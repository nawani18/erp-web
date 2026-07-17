import { Router } from "express";
import * as subjectController from "./subject.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";

const router = Router();

// Protect all routes
router.use(authenticate);
router.use(authorize("ADMIN"));

router
    .route("/")
    .get(subjectController.getSubjects)
    .post(subjectController.createSubject);

router
    .route("/:id")
    .get(subjectController.getSubjectById)
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject);

export default router;
