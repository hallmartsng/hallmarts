import { Request, Response } from 'express';
import mongoose, { SortOrder } from 'mongoose';
import Project from '../../models/project.models';
import { Payment } from '../../models/payment.models';

export const createPayment = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // const { projectId, amount, method, paymentDate } = req.body;
    const { projectId, amount, method, notes } = req.body;
    console.log(req.body);

    if (!amount || amount <= 0) {
      return res.status(405).json({
        success: false,
        message: 'Invalid payment amount',
      });
    }

    const project = await Project.findById(projectId).session(session);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // 1️⃣ Get current total paid BEFORE inserting new payment
    const paymentsAgg = await Payment.aggregate(
      [
        { $match: { project: project._id } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ],
      { session }
    );

    const totalPaid = paymentsAgg[0]?.total || 0;

    // 2️⃣ Prevent overpayment
    if (totalPaid + amount > project.budget) {
      return res.status(404).json({
        success: false,
        message: 'Payment exceeds remaining balance',
      });
    }

    // 3️⃣ Create payment
    const payment = await Payment.create(
      [
        {
          project: projectId,
          amount,
          method,
          notes,
        },
      ],
      { session }
    );

    const newTotalPaid = totalPaid + amount;

    // 4️⃣ Update payment status
    if (newTotalPaid === 0) {
      project.paymentStatus = 'pending';
    } else if (newTotalPaid < project.budget) {
      project.paymentStatus = 'partial';
    } else {
      project.paymentStatus = 'paid';
    }

    await project.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Payment added successfully',
      data: payment[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Payment failed',
    });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',

      startDate,
      endDate,
    } = req.query;

    const query: any = {};

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

    const allowedSortFields = ['amount', 'createdAt'];
    const sortField = allowedSortFields.includes(String(sortBy))
      ? String(sortBy)
      : 'createdAt';

    const sortDirection: SortOrder = sortOrder === 'asc' ? 1 : -1;

    const [expenses, total] = await Promise.all([
      Payment.find(query)
        .populate({
          path: 'project',
          select: 'name client serviceType budget',
        })
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Payment.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: 'Fecth all payments successful',
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
      message: 'Failed to fetch payments',
    });
  }
};
