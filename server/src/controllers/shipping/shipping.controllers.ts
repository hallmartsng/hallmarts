import { Request, Response } from "express";
import Shipping from "../../models/shipping.models";

export const getShippingAddress = async (req: Request, res: Response) => {
  const userId = req.userId;

  const shippingAddress = await Shipping.findOne({ user: userId });

  if (!shippingAddress) {
    return res.status(404).json({
      message: "No shipping address found",
    });
  }

  return res.status(404).json({
    message: "Shipping address found",
    success: true,
    data: shippingAddress,
  });
};

export const updateShippingAddress = async (req: Request, res: Response) => {
  const userId = req.userId;

  const shippingAddressExists = await Shipping.findOne({ user: userId });

  if (!shippingAddressExists) {
    return res.status(404).json({
      message: "No shipping address found",
    });
  }

  const updatedShippingAddress = await Shipping.findOneAndUpdate(
    { user: userId },
    req.body.body,
    { new: true, runValidators: true },
  );

  return res.status(404).json({
    message: "Shipping address updated",
    success: true,
    data: updatedShippingAddress,
  });
};
