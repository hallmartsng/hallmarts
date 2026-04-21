import { Router } from "express";
import {
  userLogin,
  userRegistration,
} from "../../controllers/users/auth.controllers";

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

router.post("/register", userRegistration);
router.post("/login", userLogin);

export default router;
