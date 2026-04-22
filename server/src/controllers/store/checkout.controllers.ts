import { Request, Response } from "express";
import { Payment } from "../../models/payment.models";
import { Order } from "../../models/order.models";
import Shipping from "../../models/shipping.models";
import { Vendor } from "../../models/vendor.models";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cart, shippingAddress } = req.body;
    console.log(cart);

    const userId = req.userId;
    // Prevent duplicate checkout
    const existingPayment = await Payment.findOne({
      user: userId,
      status: "pending",
    }).sort({ createdAt: -1 });

    if (existingPayment) {
      return res.status(200).json({
        message: "Existing payment found",
        data: {
          paymentReference: existingPayment.reference,
          amount: existingPayment.amount,
        },
        success: true,
      });
    }
    let shippingAddressId;

    const checkShippingAddress = await Shipping.findOneAndUpdate(
      { user: userId },
      shippingAddress,
      { new: true, runValidators: true },
    );

    shippingAddressId = checkShippingAddress?._id;
    if (!checkShippingAddress) {
      shippingAddressId = await Shipping.create({
        user: userId,
        ...shippingAddress,
      });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 1. Group items by vendor
    const vendorMap: Record<string, typeof cart> = {};

    for (const item of cart) {
      if (!vendorMap[item.vendorId]) {
        vendorMap[item.vendorId] = [];
      }

      vendorMap[item.vendorId].push(item);
    }

    // 2. Create vendor orders
    const createdOrders = [];
    let totalAmount = 0;

    for (const vendorId in vendorMap) {
      const vendorItems = vendorMap[vendorId];

      const totalPrice = vendorItems.reduce(
        (sum: number, item: (typeof cart)[0]) =>
          sum + item.price * item.quantity,
        0,
      );

      await Vendor.findByIdAndUpdate(
        vendorId,
        { $addToSet: { customers: userId } }, // 👈 key change
        { new: true },
      );

      const order = await Order.create({
        user: userId,
        vendor: vendorId,
        items: vendorItems.map((item: (typeof cart)[0]) => ({
          product: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.imgUrl[0].url,
        })),
        shippingAddress: shippingAddressId,
        totalPrice,
      });

      createdOrders.push(order._id);
      totalAmount += totalPrice;
    }

    // 3. Generate payment reference
    const refCode = Math.floor(10000 + Math.random() * 90000).toString();
    const reference = `HM_${Date.now()}_${refCode}`;

    // 4. Create payment record
    const payment = await Payment.create({
      user: userId,
      orders: createdOrders,
      amount: totalAmount,
      reference,
    });

    // 5. Return response (frontend will initialize payment)
    return res.status(200).json({
      message: "Checkout process initialized",
      data: {
        paymentReference: payment.reference,
        amount: payment.amount,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Checkout failed", success: false, error: error });
  }
};
