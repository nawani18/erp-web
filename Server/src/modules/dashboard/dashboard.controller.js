import { dashboardService } from "./dashboard.service.js";
import { SUCCESS_MESSAGE } from "./dashboard.constants.js";

export const getDashboard = async (req, res, next) => {
    try {
        const data = await dashboardService.getDashboardStats();

        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGE,
            data,
        });
    } catch (error) {
        next(error);
    }
};
