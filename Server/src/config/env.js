import "dotenv/config";

/**
 * env.js
 * Centralizes environment variable configuration and validation.
 * Ensures the application fails fast if critical dependencies are missing.
 */

const requiredVars = ["DATABASE_URL", "JWT_SECRET"];
const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
    throw new Error(
        `Configuration Error: Missing required environment variables: ${missingVars.join(", ")}`,
    );
}

const envConfig = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "5000", 10),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};

// Freeze the object to prevent runtime mutations
export default Object.freeze(envConfig);
