import { Request, Response } from "express";
import { Order } from "../../models/order.models";

export const getVendorCustomers = async (req: Request, res: Response) => {
  const orders = await Order.aggregate([
    {
      $match: { vendor: req.userId },
    },
    {
      $group: {
        _id: "$user",
        // name: { $first: "$shipping.name" },
        // department: { $first: "$shipping.department" },
        // campus: { $first: "$shipping.campus" },
        // orders: { $sum: 1 },
        // totalSpent: { $sum: "$totalAmount" },
        // lastOrder: { $max: "$createdAt" },
      },
    },
  ]);

  return res.status(200).json({
    data: orders,
    success: true,
  });
};
