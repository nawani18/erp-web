import jwt from "jsonwebtoken";
import prisma from "../../../prisma/prisma.js";
import env from "../../config/env.js";

/**
 * auth.middleware.js
 * Middleware to verify JWT tokens and attach the authenticated user to the request.
 */

export const authenticate = async (req, res, next) => {
    try {
        // 1. Read Authorization header
        const authHeader = req.headers.authorization;

        // 2. Expect format: Bearer <token>
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];

        // 4. Verify JWT
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // 5 & 6. Find the user using the existing Prisma adapter
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        // 7. If user does not exist
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // 8. If user is inactive
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account has been disabled",
            });
        }

        // 9. Remove password before attaching
        const { password, ...userWithoutPassword } = user;

        // 10. Attach the authenticated user to req.user
        req.user = userWithoutPassword;

        // 11. Continue
        next();
    } catch (error) {
        // Handle JWT specific errors (Expired, Malformed)
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        // Pass unexpected errors to the global error handler
        next(error);
    }
};
