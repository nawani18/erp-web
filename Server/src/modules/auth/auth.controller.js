import AuthService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { LOGIN_SUCCESS } from "./auth.constants.js";

/**
 * auth.controller.js
 * Handles HTTP requests for authentication.
 */

/**
 * Login user and generate authentication token.
 */
export const login = async (req, res, next) => {
    try {
        // 1. Validate request body
        const { email, password } = loginSchema.parse(req.body);

        // 2. Call AuthService
        const { user, token } = await AuthService.login(email, password);

        // 3. Return success response
        return res.status(200).json({
            success: true,
            message: LOGIN_SUCCESS,
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        // 4. Handle errors
        next(error);
    }
};

/**
 * Get current authenticated user profile.
 */
export const getMe = async (req, res, next) => {
    try {
        // 1. Read req.user (already attached by authentication middleware)
        const user = req.user;

        // 2. Remove password before returning
        const { password, ...userWithoutPassword } = user;

        // 3. Return success response
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully.",
            data: userWithoutPassword,
        });
    } catch (error) {
        // 4. Handle errors
        next(error);
    }
};
