import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategory extends Document {
  title: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
categorySchema.index({ title: 1 });
export const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema,
);
