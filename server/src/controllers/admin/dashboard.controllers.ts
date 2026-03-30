import { Request, Response } from 'express';
import Project from '../../models/project.models';
import { User } from '../../models/user.model';

export const getDashboardOverview = async (_req: Request, res: Response) => {
  try {
    const [projectStats] = await Project.aggregate([
      {
        $facet: {
          totalProjects: [{ $count: 'count' }],

          completedProjects: [{ $match: { status: 5 } }, { $count: 'count' }],

          totalRevenue: [
            {
              $group: {
                _id: null,
                total: { $sum: '$budget' },
              },
            },
          ],
        },
      },
    ]);

    const totalClients = await User.countDocuments({ role: 'user' });

    return res.status(200).json({
      success: true,
      data: {
        totalProjects: projectStats.totalProjects[0]?.count || 0,
        completedProjects: projectStats.completedProjects[0]?.count || 0,
        totalRevenue: projectStats.totalRevenue[0]?.total || 0,
        totalClients,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard analytics',
      error,
    });
  }
};

export const getMonthlyCompletedProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const year = Number(req.query['year']) || new Date().getFullYear();

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const completedProjects = await Project.aggregate([
      {
        $match: {
          status: 5, // assuming 5 = completed
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' }, // MongoDB months are 1-indexed
          total: { $sum: 1 },
        },
      },
    ]);

    // Normalize months 1-12
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const completedMap = new Map(
      completedProjects.map((p) => [p._id, p.total])
    );

    const formatted = {
      year,
      months: months.map((m) =>
        new Date(0, m - 1).toLocaleString('default', { month: 'short' })
      ),
      completed: months.map((m) => completedMap.get(m) || 0),
    };

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching monthly completed projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly completed projects',
    });
  }
};

export const getRevenueByServiceType = async (req: Request, res: Response) => {
  try {
    // Optional: filter by year
    const year = Number(req.query['year']) || new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    // Aggregate projects grouped by serviceType
    const projectsByServiceType = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 },
        },
      },
    ]);

    // Ensure all service types are represented (even if zero)
    const serviceTypes = [
      'architech',
      'rennovation',
      '3d_visualization',
      'interior_design',
    ];
    const dataMap = new Map(projectsByServiceType.map((p) => [p._id, p.count]));

    const formattedData = serviceTypes.map((type) => dataMap.get(type) || 0);

    // Response suitable for a bar chart
    res.status(200).json({
      success: true,
      data: {
        labels: serviceTypes.map((s) => s.replace('_', ' ')), // nicer labels
        series: [
          {
            name: 'Projects',
            data: formattedData,
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects by service type',
      error,
    });
  }
};
