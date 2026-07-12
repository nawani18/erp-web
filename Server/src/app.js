import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "College ERP API is running",
    });
});

// API Routes
app.use("/api", apiRoutes);

// 404 Not Found Middleware
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
