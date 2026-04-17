import { Request, Response } from "express";
import { Payment } from "../models/payment.models";
import { Order } from "../models/order.models";

export const paymentWebhook = async (req: Request, res: Response) => {
  try {
    const { reference, status } = req.body;

    // Only handle successful charge
    if (status === 200) {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      // Update payment status
      payment.status = "success";
      await payment.save();

      // Update all related orders
      await Order.updateMany(
        { _id: { $in: payment.orders } },
        { paymentStatus: "paid", orderStatus: "accepted" },
      );
    }

    return res.status(200).json({
      message: "Order and payment completed",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Order processing failed",
      success: false,
    });
  }
};
