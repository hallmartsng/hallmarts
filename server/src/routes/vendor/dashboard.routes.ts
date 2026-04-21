import { Router } from "express";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import { getVendorDashboardAnalytics } from "../../controllers/vendor/dashboard.controllers";

const router = Router();

router.get("/", vendorAuthenticateMiddleWare, getVendorDashboardAnalytics);

export default router;
