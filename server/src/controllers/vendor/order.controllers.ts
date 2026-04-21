import { Request, Response } from "express";
import { Order } from "../../models/order.models";

export const getVendorOrders = async (req: Request, res: Response) => {
  // Vendor Dashboard Query

  // Vendor sees only their orders.

  const orders = await Order.find({ vendor: req.userId })
    .populate("user", "name campus email fname")
    .populate("shippingAddress", "campus address")
    .sort({
      createdAt: -1,
    });

  return res.status(200).json({
    data: orders,
    success: true,
  });
};
