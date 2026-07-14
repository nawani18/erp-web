import { dashboardService } from "./dashboard.service.js";
import * as dashboardController from "./dashboard.controller.js";
import dashboardRouter from "./dashboard.routes.js";

export {
    dashboardRouter as router,
    dashboardController as controller,
    dashboardService as service,
};
