import { Router } from "express";
import {
  sendOtp,
  upDatePassword,
  vendorLogin,
  vendorRegistration,
  verifyOtp,
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
router.post("/send-opt", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", upDatePassword);

export default router;
