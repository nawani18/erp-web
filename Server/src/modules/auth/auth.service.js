import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/prisma.js";
import env from "../../config/env.js";
import { INVALID_CREDENTIALS, ACCOUNT_DISABLED } from "./auth.constants.js";

/**
 * AuthService
 * Handles authentication business logic for the College ERP.
 */
class AuthService {
    /**
     * Authenticates a user and returns their profile and a JWT.
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error(INVALID_CREDENTIALS);
        }

        // 2. Check if account is active
        if (!user.isActive) {
            throw new Error(ACCOUNT_DISABLED);
        }

        // 3. Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error(INVALID_CREDENTIALS);
        }

        // 4. Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES_IN },
        );

        // 5. Exclude password from user object before returning
        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    /**
     * Retrieves user profile by ID.
     * @param {number} userId
     */
    async getMe(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Exclude password from user object
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}

export default new AuthService();
