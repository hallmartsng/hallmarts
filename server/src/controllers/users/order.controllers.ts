import { Request, Response } from "express";
import { Order } from "../../models/order.models";

export const getUserOrders = async (req: Request, res: Response) => {
  // Vendor Dashboard Query

  // Vendor sees only their orders.

  // const orders = await Order.find({ vendor: req.vendor._id })
  // .populate("items.product")
  // .sort({ createdAt: -1 });

  const orders = await Order.find({ user: req.userId })
    .populate("shippingAddress", "campus name regNo email phone state address")
    .populate("items.productId")
    .sort({ createdAt: -1 });

  console.log("orders: ", orders);

  return res.status(202).json({
    data: orders,
    success: true,
  });
};
