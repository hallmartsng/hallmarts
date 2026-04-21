import { Request, Response } from "express";
import mongoose from "mongoose";
import { Vendor } from "../../models/vendor.models";
import { Order } from "../../models/order.models";
import Product from "../../models/products.models";

export const getVendorDashboardAnalytics = async (
  req: Request,
  res: Response,
) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.userId);

    // Get vendor campus
    const vendor = await Vendor.findById(vendorId).select("campus");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const vendorCampus = vendor.campus;

    const [
      revenueResult,
      orderStats,
      totalOrders,
      productStats,
      totalProducts,
      customers,
    ] = await Promise.all([
      // Total revenue
      Order.aggregate([
        {
          $match: {
            vendor: vendorId,
            paymentStatus: "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]),

      // Orders by status
      Order.aggregate([
        {
          $match: { vendor: vendorId },
        },
        {
          $group: {
            _id: "$orderStatus",
            count: { $sum: 1 },
          },
        },
      ]),

      // Total orders
      Order.countDocuments({ vendor: vendorId }),

      // Products by status
      Product.aggregate([
        {
          $match: { vendor: vendorId },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // Total products
      Product.countDocuments({ vendor: vendorId }),

      // Customers reached
      Order.aggregate([
        {
          $match: { vendor: vendorId },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $group: {
            _id: "$user._id",
            campus: { $first: "$user.campus" },
          },
        },
      ]),
    ]);

    // Revenue
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Orders breakdown
    let completed = 0;
    let pending = 0;
    let cancelled = 0;

    orderStats.forEach((stat) => {
      if (stat._id === "accepted") completed = stat.count;
      if (stat._id === "processing") pending = stat.count;
      if (stat._id === "cancelled") cancelled = stat.count;
    });

    // Products breakdown
    let approved = 0;
    let pendingApproval = 0;
    let rejected = 0;

    productStats.forEach((stat) => {
      if (stat._id === "approved") approved = stat.count;
      if (stat._id === "pending") pendingApproval = stat.count;
      if (stat._id === "rejected") rejected = stat.count;
    });

    // Customers reached
    let onCampus = 0;
    let offCampus = 0;

    customers.forEach((customer) => {
      if (customer.campus === vendorCampus) {
        onCampus++;
      } else {
        offCampus++;
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        revenue: totalRevenue,
        orders: {
          total: totalOrders,
          completed,
          pending,
          cancelled,
        },
        products: {
          total: totalProducts,
          approved,
          pendingApproval,
          rejected,
        },
        customers: {
          total: customers.length,
          onCampus,
          offCampus,
        },
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard analytics",
    });
  }
};
