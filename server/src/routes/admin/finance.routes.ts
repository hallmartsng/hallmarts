import express from 'express';
import {
  getFinanceAnalytics,
  getMonthlyCashflow,
  getOutstandingByProject,
} from '../../controllers/admin/finance.controllers';
import { authenticateMiddleWare } from '../../middlewares/authenticate.middleware';

const router = express.Router();

router.get('/analytics', authenticateMiddleWare, getFinanceAnalytics);
router.get('/monthly-cashflow', authenticateMiddleWare, getMonthlyCashflow);
router.get(
  '/outstanding-by-project',
  authenticateMiddleWare,
  getOutstandingByProject
);

export default router;
