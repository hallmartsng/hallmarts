import { Router } from 'express';
import {
  getDashboardOverview,
  getMonthlyCompletedProjects,
  getRevenueByServiceType,
} from '../../controllers/admin/dashboard.controllers';
import authenticateMiddleWare from '../../middlewares/authenticate.middleware';

const router = Router();

router.get('/overview', authenticateMiddleWare, getDashboardOverview);
router.get(
  '/monthly-completed-projects',
  authenticateMiddleWare,
  getMonthlyCompletedProjects
);
router.get(
  '/revenue-by-services',
  authenticateMiddleWare,
  getRevenueByServiceType
);

export default router;
