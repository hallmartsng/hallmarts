import { Request, Response } from "express";
import { Order } from "../../models/order.models";
import mongoose from "mongoose";

export const getVendorCustomers = async (req: Request, res: Response) => {
  // const customers = await Order.aggregate([
  //   {
  //     $match: { vendor: req.userId },
  //   },
  //   {
  //     $lookup: {
  //       from: "shippings",
  //       localField: "shippingAddress",
  //       foreignField: "_id",
  //       as: "shipping",
  //     },
  //   },
  //   {
  //     $unwind: "$shipping",
  //   },
  //   {
  //     $group: {
  //       _id: "$user",
  //       name: { $first: "$shipping.name" },
  //       department: { $first: "$shipping.department" },
  //       campus: { $first: "$shipping.campus" },
  //       orders: { $sum: 1 },
  //       totalSpent: { $sum: "$totalPrice" },
  //     },
  //   },
  // ]);
  const customers = await Order.aggregate([
    {
      $match: {
        vendor: new mongoose.Types.ObjectId(req.userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $group: {
        _id: "$user._id",
        name: { $first: "$user.fname" },
        department: { $first: "$user.department" },
        campus: { $first: "$user.campus" },
        orders: { $sum: 1 },
        totalSpent: { $sum: "$totalPrice" },
      },
    },
  ]);
  const orders = await Order.find({ vendor: req.userId });

  console.log("customers: ", customers);
  console.log("orders: ", orders);

  return res.status(200).json({
    data: customers,
    success: true,
  });
};
