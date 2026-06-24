import { Request, Response } from "express";
import { Category } from "../../models/category.model";
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;

    if (category) {
      const categories = await Category.find({
        title: {
          $regex: `^${category}$`,
          $options: "i",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: categories,
      });
    }

    const categories = await Category.find()
      .select("title icon createdAt updatedAt")
      .sort({ title: 1 });

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategorySummary = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          //   let: { categoryId: "$_id" },
          //   pipeline: [
          //     {
          //       $match: {
          //         $expr: {
          //           $in: ["$$categoryId", "$categories"],
          //         },
          //         isVerified: true,
          //         stock: { $gt: 0 },
          //       },
          //     },
          //   ],
          localField: "title",
          foreignField: "categories",
          as: "products",
        },
      },
      {
        $project: {
          title: 1,
          icon: 1,
          productCount: {
            $size: "$products",
          },
        },
      },
      {
        $sort: {
          title: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Category summary fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
