/**
 * auth.constants.js
 * Authentication-related constants for the College ERP backend.
 */

export const JWT_COOKIE_NAME = "erp_token";

export const DEFAULT_ADMIN_ROLE = "ADMIN";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MAX_LENGTH = 128;

export const LOGIN_MESSAGES = {
    INVALID_CREDENTIALS: "The email or password provided is incorrect.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    ACCOUNT_DISABLED:
        "Your account has been disabled. Please contact the administrator.",
    UNAUTHORIZED: "You do not have permission to perform this action.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
};

// Export individual message constants for easy access
export const INVALID_CREDENTIALS = LOGIN_MESSAGES.INVALID_CREDENTIALS;
export const LOGIN_SUCCESS = LOGIN_MESSAGES.LOGIN_SUCCESS;
export const LOGOUT_SUCCESS = LOGIN_MESSAGES.LOGOUT_SUCCESS;
export const ACCOUNT_DISABLED = LOGIN_MESSAGES.ACCOUNT_DISABLED;
export const UNAUTHORIZED = LOGIN_MESSAGES.UNAUTHORIZED;
export const TOKEN_EXPIRED = LOGIN_MESSAGES.TOKEN_EXPIRED;
