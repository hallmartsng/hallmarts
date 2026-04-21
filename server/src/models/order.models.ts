import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  vendor: mongoose.Schema.Types.ObjectId;
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId;
      name: string;
      price: number;
      quantity: number;
      image: string;
    },
  ];
  totalPrice: number;
  shippingAddress: mongoose.Schema.Types.ObjectId;
  paymentStatus: "pending" | "paid";
  orderStatus: "processing" | "accepted" | "delivered";

  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalPrice: Number,

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "accepted", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true },
);

export const Order: Model<IOrder> = mongoose.model<IOrder>(
  "Order",
  orderSchema,
);
