import { Request, Response } from "express";
import { Comment } from "../../models/comment.model";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, ratings, productId, vendorId } = req.body;
    console.log(req.body);

    const comment = await Comment.create({
      user: req.userId,
      vendorId,
      ratings,
      content,
      productId,
    });
    return res.status(201).json({
      message: "Comment successful",
      success: true,
      data: comment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Comment Failed",
      success: false,
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  console.log(req.params);

  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId: productId })
      .populate("user", "fname")
      .sort({
        createdAt: -1,
      });
    return res.status(201).json({
      message: "Comment successful",
      success: true,
      data: comments,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Comment fetch failed",
      success: false,
    });
  }
};
