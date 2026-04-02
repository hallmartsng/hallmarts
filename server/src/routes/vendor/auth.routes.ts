import { Router } from "express";
import {
  vendorLogin,
  vendorRegistration,
} from "../../controllers/vendor/auth.controller";

const router = Router();

// router.get('/overview', authenticateMiddleWare, getDashboardOverview);
// router.get(
//   '/monthly-completed-projects',
//   authenticateMiddleWare,
//   getMonthlyCompletedProjects
// );
// router.get(
//   '/revenue-by-services',
//   authenticateMiddleWare,
//   getRevenueByServiceType
// );

router.post("/register", vendorRegistration);
router.post("/login", vendorLogin);

export default router;
