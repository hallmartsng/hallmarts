import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../../models/products.models";
import { User } from "../../models/user.models";

export const toggleWishlist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
      return;
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const alreadyWishlisted = user.wishList.some(
      (id) => id.toString() === productId,
    );

    if (alreadyWishlisted) {
      user.wishList = user.wishList.filter((id) => id.toString() !== productId);

      await user.save();

      res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        data: product,
        wishlisted: false,
      });

      return;
    }

    user.wishList.push(new mongoose.Types.ObjectId(productId));

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: product,
      wishlisted: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
