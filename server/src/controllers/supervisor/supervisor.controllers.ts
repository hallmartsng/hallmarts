import { Request, Response } from 'express';
import { User } from '../../models/user.model';

// Get all projects
export const getAllSupervisors = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const query: any = { role: 'supervisor' };

    // SEARCH
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ];
    }

    const supervisors = await User.find(query).select('-password');

    res.status(200).json({
      success: true,
      message: 'Supervisors fetched successfully',
      data: supervisors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supervisors',
      error,
    });
  }
};
