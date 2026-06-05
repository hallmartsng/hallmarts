import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../../models/products.models";
import { User } from "../../models/user.models";

export const toggleWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyWishlisted = user.wishList.some(
      (id) => id.toString() === productId,
    );

    if (alreadyWishlisted) {
      user.wishList = user.wishList.filter((id) => id.toString() !== productId);

      await user.save();

      return res.status(200).json({
        success: true,
        message: `${product.title} removed from wishlist`,
        data: { product: product, wishlisted: false },
      });
    }

    user.wishList.push(new mongoose.Types.ObjectId(productId));

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${product.title} added to wishlist`,
      data: { product: product, wishlisted: true },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .select("wishList")
      .populate("wishList");

    return res.status(200).json({
      success: true,
      data: user?.wishList ?? [],
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false, error: error });
  }
};
