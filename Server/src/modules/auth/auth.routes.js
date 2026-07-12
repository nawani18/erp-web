import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

/**
 * auth.routes.js
 * Authentication routes for the College ERP.
 */

const router = Router();

// POST /api/auth/login
router.post("/login", authController.login);

// GET /api/auth/me (Protected route)
router.get("/me", authenticate, authController.getMe);

export default router;
