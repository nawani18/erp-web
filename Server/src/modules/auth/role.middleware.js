/**
 * role.middleware.js
 * Middleware to restrict route access based on user roles.
 * Usage: router.get('/admin-only', authenticate, authorize('ADMIN'), controller.method);
 */

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user is authenticated (req.user should be attached by previous middleware)
        // and if their role is included in the allowedRoles array.
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied.",
            });
        }

        // Role is authorized
        next();
    };
};
