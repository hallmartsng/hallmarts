import { Request, Response } from 'express';
import Project from '../../models/project.models';
import { Payment } from '../../models/payment.models';
import { Expense } from '../../models/expense.models';

// Finance analytics overview
export const getFinanceAnalytics = async (_req: Request, res: Response) => {
  try {
    const [projectAgg, paymentsAgg, expensesAgg] = await Promise.all([
      Project.aggregate([
        { $group: { _id: null, total: { $sum: '$budget' } } },
      ]),
      Payment.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Expense.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    const totalProjectValue = projectAgg[0]?.total || 0;
    const totalPayments = paymentsAgg[0]?.total || 0;
    const totalExpenses = expensesAgg[0]?.total || 0;

    const outstanding = totalProjectValue - totalPayments;
    const netCashFlow = totalPayments - totalExpenses;

    res.status(200).json({
      success: true,
      data: {
        totalProjectValue,
        totalPayments,
        totalExpenses,
        outstanding,
        netCashFlow,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch finance overview',
    });
  }
};

// Finance Line chart cash flow
export const getMonthlyCashflow = async (req: Request, res: Response) => {
  try {
    const year = Number(req.query['year']) || new Date().getFullYear();

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const payments = await Payment.aggregate([
      {
        $match: {
          paymentDate: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$paymentDate' },
          total: { $sum: '$amount' },
        },
      },
    ]);

    const expenses = await Expense.aggregate([
      {
        $match: {
          status: 'approved',
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' }, // ✅ group by createdAt
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Normalize months 1-12
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const paymentsMap = new Map(payments.map((p) => [p._id, p.total]));

    const expensesMap = new Map(expenses.map((e) => [e._id, e.total]));

    const formatted = {
      year,
      months: months.map((m) =>
        new Date(0, m - 1).toLocaleString('default', {
          month: 'short',
        })
      ),
      payments: months.map((m) => paymentsMap.get(m) || 0),
      expenses: months.map((m) => expensesMap.get(m) || 0),
    };

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly cashflow',
    });
  }
};

// Outstandings by projects
export const getOutstandingByProject = async (_req: Request, res: Response) => {
  try {
    const result = await Project.aggregate([
      {
        $lookup: {
          from: 'payments',
          localField: '_id',
          foreignField: 'project',
          as: 'payments',
        },
      },
      {
        $addFields: {
          totalPaid: { $sum: '$payments.amount' },
        },
      },
      {
        $project: {
          name: 1,
          budget: 1,
          totalPaid: 1,
          outstanding: { $subtract: ['$budget', '$totalPaid'] },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outstanding projects',
    });
  }
};
