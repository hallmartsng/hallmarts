import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  orders: [mongoose.Schema.Types.ObjectId];
  amount: number;
  currency: string;
  paymentProvider: string;
  reference: string;
  status: "pending" | "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    paymentProvider: {
      type: String,
      default: "paystack",
    },

    reference: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Payment: Model<IPayment> = mongoose.model<IPayment>(
  "Payment",
  paymentSchema,
);
