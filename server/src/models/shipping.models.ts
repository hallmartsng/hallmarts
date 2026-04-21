import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShipping extends Document {
  user: mongoose.Types.ObjectId;
  //   campus: mongoose.Types.ObjectId;
  campus: string;
  name: string;
  regNo: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  address: string;
}

const shippingSchema = new Schema<IShipping>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    campus: {
      type: String,
      lowercase: true,
    },

    name: { type: String, lowercase: true, trim: true },
    regNo: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, lowercase: true, trim: true },
    city: { type: String, lowercase: true, trim: true },
    state: { type: String, lowercase: true, trim: true },
    country: { type: String, lowercase: true, trim: true },
    address: { type: String, lowercase: true, trim: true },
  },

  { timestamps: true },
);

export const Shipping: Model<IShipping> = mongoose.model<IShipping>(
  "Shipping",
  shippingSchema,
);

export default Shipping;
