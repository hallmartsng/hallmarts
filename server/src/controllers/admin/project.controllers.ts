import { Request, Response } from 'express';
import Project from '../../models/project.models';
import { SortOrder } from 'mongoose';
import {
  sendProjectConfirmationEmail,
  sendProjectProgressEmail,
} from '../../utils/sendEmail';
import { User } from '../../models/user.model';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const budget = 10000000;
    const userId = req.userId;

    // 1️⃣ Check if user exists by email
    let user = await User.findOne({ email });

    // 2️⃣ If user does not exist → create one
    if (!user) {
      user = await User.create({
        name: name || 'Client User',
        email,
        password: `${email}Default123!`, // ⚠️ Improve later
        role: 'user',
      });
    }

    // 3️⃣ Create project linked to user
    const project = await Project.create({
      ...req.body,
      user: user._id,
      assignedTo: [userId], // 🔥 link project to user
    });

    console.log('Created project: ', project);

    // 4️⃣ Send email (non-blocking)
    sendProjectConfirmationEmail(user.email, budget, project.name, name)
      .then(() => {
        console.log('Project confirmation email sent to:', user.email);
      })
      .catch((emailError) => {
        console.error('Email failed but project created:', emailError);
      });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error,
    });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const {
      search,
      status,
      phase,
      state,
      startDate,
      assignedTo,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query: any = {};

    // SEARCH
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) query.status = Number(status);
    if (phase) query.phase = phase;
    if (state) query['location.state'] = state;

    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) query.startDate.$gte = new Date(startDate as string);
      if (endDate) query.startDate.$lte = new Date(endDate as string);
    }

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // 🔥 SORTING FIX
    const allowedSortFields = [
      'name',
      'client',
      'budget',
      'startDate',
      'endDate',
      'createdAt',
      'assignedTo',
    ];

    const sortField = allowedSortFields.includes(String(sortBy))
      ? String(sortBy)
      : 'createdAt';

    const sortDirection: SortOrder = sortOrder === 'asc' ? 1 : -1;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ [sortField]: sortDirection } as Record<string, SortOrder>)
        .skip(skip)
        .limit(limitNumber)
        .populate('assignedTo', 'email'),
      Project.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
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
      message: 'Failed to fetch projects',
      error,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 1️⃣ Update project
    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // 2️⃣ Get the project owner
    const user = await User.findById(updatedProject.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { phase, stages } = req.body;

    // 3️⃣ Send progress email
    sendProjectProgressEmail(
      user.email,
      updatedProject.name,
      user?.name || '',

      stages,
      phase
    )
      .then(() => {
        console.log('Project progress email sent to:', user.email);
      })
      .catch((emailError) => {
        console.error('Email failed but project updated:', emailError);
      });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error,
    });
  }
};
