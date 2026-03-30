import { Request, Response } from 'express';
import { Expense } from '../../models/expense.models';
import { SortOrder } from 'mongoose';
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
// Create expense
export const createExpense = async (req: Request, res: Response) => {
  console.log('req body: ', req.body);

  const requestedBy = req?.userId;

  const expense = await Expense.create({
    ...req.body,
    requestedBy,
  });
  res.status(201).json({
    message: 'Expense created successfully',
    success: true,
    data: expense,
  });
};

// Get expenses
export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      startDate,
      endDate,
    } = req.query;

    const query: any = {};

    // Status filter
    if (
      status &&
      ['pending', 'approved', 'declined'].includes(String(status))
    ) {
      query.status = status;
    }

    // ✅ Date range filter
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(String(startDate)),
        $lte: new Date(String(endDate)),
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const allowedSortFields = ['status', 'amount', 'type', 'createdAt'];
    const sortField = allowedSortFields.includes(String(sortBy))
      ? String(sortBy)
      : 'createdAt';

    const sortDirection: SortOrder = sortOrder === 'asc' ? 1 : -1;

    const [expenses, total] = await Promise.all([
      Expense.find(query)
        .populate({
          path: 'project',
          select: 'name client serviceType',
        })
        .populate({
          path: 'requestedBy',
          select: 'name email',
        })
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Expense.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: 'Expenses fetched successfully',
      data: expenses,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses',
    });
  }
};
// Get Expenses by type
export const getExpensesByType = async (_req: Request, res: Response) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $match: { status: 'approved' }, // ✅ only approved
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses by type',
    });
  }
};

export const getAllApprovedExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ status: 'approved' }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses by type',
    });
  }
};

// Toggle Expenses
// export const toggleExpenseApproval = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     // const expense = await Expense.findByIdAndUpdate(
//     //   id,
//     //   [
//     //     {
//     //       $set: {
//     //         approved: { $not: '$approved' }, // 🔥 atomic toggle
//     //         // approvedBy: req.user.id,
//     //         // approvedAt: new Date(),
//     //       },
//     //     },
//     //   ],
//     //   { new: true }
//     // );
//     const expense = await Expense.findByIdAndUpdate(
//       id,
//       {
//         $bit: { approved: { xor: 1 } }, // 🔥 atomic toggle without pipeline
//       },
//       { new: true }
//     );

//     if (!expense) {
//       return res.status(404).json({
//         success: false,
//         message: 'Expense not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Expense ${
//         expense.approved ? 'approved' : 'declined'
//       } successfully`,
//       data: expense,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: 'An error occurred, try again',
//     });
//   }
// };
export const updateExpenseStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const allowedStatuses = ['pending', 'approved', 'declined'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const expense = await Expense.findByIdAndUpdate(
      id,
      { $set: { status, opened: true } },
      { returnDocument: 'after' } // replaces new: true
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Expense marked as ${status}`,
      data: expense,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred, try again',
    });
  }
};
