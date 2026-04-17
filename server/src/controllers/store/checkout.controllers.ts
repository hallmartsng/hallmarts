import { Request, Response } from "express";
import { Payment } from "../../models/payment.models";
import { Order } from "../../models/order.models";
import Shipping from "../../models/shipping.models";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cart, shippingAddress } = req.body;
    const userId = req.userId;
    let shippingAddressId;
    console.log(shippingAddress);

    const checkShippingAddress = await Shipping.findOneAndUpdate(
      { user: userId },
      shippingAddress,
      { new: true, runValidators: true },
    );

    shippingAddressId = checkShippingAddress?._id;
    if (!checkShippingAddress) {
      shippingAddressId = await Shipping.create({ user: userId });
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

      const subtotal = vendorItems.reduce(
        (sum: number, item: (typeof cart)[0]) =>
          sum + item.price * item.quantity,
        0,
      );

      const order = await Order.create({
        user: userId,
        vendor: vendorId,
        items: vendorItems.map((item: (typeof cart)[0]) => ({
          product: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: shippingAddressId,
        subtotal,
      });

      createdOrders.push(order._id);
      totalAmount += subtotal;
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
