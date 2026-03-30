import express from 'express';
import {
  updateExpenseStatus,
  createExpense,
  getAllExpenses,
  getExpensesByType,
  getAllApprovedExpenses,
} from '../../controllers/admin/expense.controllers';
import authenticateMiddleWare from '../../middlewares/authenticate.middleware';
const router = express.Router();

router.post('/', authenticateMiddleWare, createExpense);
router.get('/', authenticateMiddleWare, getAllExpenses);
router.get('/approved', authenticateMiddleWare, getAllApprovedExpenses);
router.get('/expenses-by-type', authenticateMiddleWare, getExpensesByType);
router.patch(
  '/:id/update-expense-status',
  authenticateMiddleWare,
  updateExpenseStatus
);

export default router;
