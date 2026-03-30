import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpense extends Document {
  project?: mongoose.Types.ObjectId;
  amount: number;
  type: 'electrical' | 'wood' | 'tools' | 'material' | 'labor' | 'logistics';
  description?: string;
  requestedBy?: mongoose.Types.ObjectId;
  requestedDate: Date;
  opened: boolean;
  approvedDate?: Date;
  createdAt: Date;
  urgencyLevel: 'low' | 'medium' | 'high';
  updatedAt: Date;
  status: 'pending' | 'approved' | 'declined';
  declined?: boolean;
}

const expenseSchema = new Schema<IExpense>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ['electrical', 'wood', 'tools', 'material', 'labor', 'logistics'],
      required: true,
      index: true,
    },
    urgencyLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    opened: {
      type: Boolean,
      default: false,
      index: true,
    },
    declined: {
      type: Boolean,
      default: false,
      index: true,
    },
    approvedDate: { type: Date },
    requestedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

expenseSchema.index({ approvedDate: -1 });
export const Expense: Model<IExpense> = mongoose.model(
  'Expense',
  expenseSchema
);
