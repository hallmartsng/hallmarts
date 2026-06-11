import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  ratings: number;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },

    ratings: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
commentSchema.index({ user: 1, status: 1 });
export const Comment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  commentSchema,
);
